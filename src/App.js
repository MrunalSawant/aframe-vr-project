
import './App.css'
import 'aframe'
import 'aframe-environment-component'
import AnnotationScene from './component/AnnotationScene/AnnotationScene';
import Video from './component/Video/Video'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './component/UI/Navigation';


function App() {
  return (
    <div className="frame">
      <BrowserRouter>
        <Routes>
          <Route index element={<AnnotationScene />} />
          <Route path="annotation" element={<AnnotationScene />} />
          <Route path="video" element={<Video />} />
        </Routes>
        <Navigation></Navigation>
      </BrowserRouter>
    </div>
  );
}

export default App;
