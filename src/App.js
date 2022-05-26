
import './App.css'
import 'aframe'
import 'aframe-environment-component'
import AnnotationScene from './component/AnnotationScene/AnnotationScene';
import Video from './component/Video/Video'

function App() {
  return (

    <div className="App">
      <AnnotationScene></AnnotationScene>
      {/* <Video></Video> */}
    </div>
  );
}

export default App;
