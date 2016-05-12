var React = require('react');
var DisplayImage = require('./DisplayImage.react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var SignatureArea = React.createClass({

  getInitialState: function() {
    return {display:0, img_list:[], img_list_signed:[], status:'', post_co:[], aadharNum:'', uuid:'', state_id:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    if(this.state.display){
      var images = this.state.img_list.map((list,i) => {
        return [
          <div>
            <img id={'doc' + i} src={list} onMouseOver={this._onSelectArea}></img>
          </div>
        ];
      });
      return (
        <div>
          <div>
            {images}
          </div>
          <div>
              <button id="sign" type="button" onClick={this._onSign}>Finalize Selected Area and SendOTP</button>
          </div>
          <DisplayImage list={this.state.img_list_signed} />
        </div>
      );
    }
    else {
      return(<div></div>);
    }
  },
  
  _onSelectArea: function(event, id) {
    event.preventDefault();
    $('#' + event.target.id).selectAreas({
      allowResize: true,
      minSize: [100, 50],
      onChanged: debugQtyAreas,
      width: 610,
      areas: []
    });
    

    function debugQtyAreas (event, id, areas) {
      //console.log(areas);
    };
	},

  _onSign: function(event, id) {
    event.preventDefault();
    if(event.target.id=="sign") {
      var number_of_pages = this.state.img_list.length;
      var post_coordinates = [];
      for (var i = 0; i < number_of_pages; i++) {
        var image_co = $('#doc' + i).selectAreas('areas');
        if(image_co.length !== 0) {
          var img = document.getElementById('doc' + i);
          var width = img.clientWidth;
          var height = img.clientHeight;;
          for (var q = 0; q < image_co.length; q++) {
            var x1 = image_co[q].x;
            var y1 = image_co[q].y;
            var x2 = image_co[q].x + image_co[q].width;
            var y2 = image_co[q].y + image_co[q].height;
            x1 = Math.round(x1 / width * 72 * 8.27);
            y1 = Math.round((1 - y1 / height) * 72 * 11.69);
            x2 = Math.round(x2 / width * 72 * 8.27);
            y2 = Math.round((1 - y2 / height) * 72 * 11.69);
            post_coordinates.push([x1, y1, x2, y2, i + 1]);
          }
        }
      }
      // Imp observation - The comment statement below doesn't work when
      // uncommented, but statement below it works

      //this.setState({post_co: post_coordinates});
      //console.log(this.state.post_co);
      this.setState({post_co: post_coordinates}, function () {
        console.log(this.state.post_co);
        UserActions.SendCheckAadharOTP('547406271887', this.state.uuid, this.state.state_id, this.state.post_co);
      });
   }
  },

  _onChangeState: function() {
    this.setState({display: UserStore.signatureAreaDisplay(),img_list: UserStore.setImageList(), img_list_signed: UserStore.setImageListSigned(), uuid:UserStore.setDocInfo()[0], state_id:UserStore.setDocInfo()[1]});
  }
});

module.exports = SignatureArea;