var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var SignatureArea = React.createClass({

  getInitialState: function() {
    return {display:1, fileObj:'', imgsrc_list:[], status:'', post_co:[], aadharNum:''};
  },
  
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChangeState);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChangeState);
  },

  render: function() {
    return (
      <div>
        <div>
          <img id="doc1" src="http://docx.8finatics.com/doc_image/69a44890-1675-11e6-8255-029616a1ba6b_210_1.png" onMouseOver={this._onSelectArea}></img>
        </div>
        <div>
            <button id="sign" type="button" onClick={this._onSign}>Finalize Selected Area and SendOTP</button>
        </div>
      </div>
    );
  },
  
  _onSelectArea: function(event, id) {
  	event.preventDefault();
    var post_coordinates = [];
    $('#doc1').selectAreas({
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
      var post_coordinates = [];
      var image_co = $('#doc1').selectAreas('areas');
      if(image_co.length !== 0) {
        var img = document.getElementById('doc1');
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
          post_coordinates.push([x1, y1, x2, y2, 1]);
        }
        
        // Imp observation - The comment statement below doesn't work when
        // uncommented, but statement below it works

        //this.setState({post_co: post_coordinates});
        //console.log(this.state.post_co);
        this.setState({post_co: post_coordinates}, function () {
          console.log(this.state.post_co);
        });
      }
      //UserActions.SendLinkAadharOTP();
   }
  },

  _onChangeState: function() {
  }
});

module.exports = SignatureArea;