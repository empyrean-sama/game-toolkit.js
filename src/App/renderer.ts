import './index.css';
import BindImgui from '../Engine/bind-imgui/bind-imgui.js';
import { EmbindModule } from '../Engine/bind-imgui/interface';

BindImgui().then((embindModule: EmbindModule) => {
    console.info("successfully loaded the Embind Module");
    embindModule.CheckVersion();
    console.info("using c++ to lerp between 1 and 2 values")
    console.log('lerp result: ' + embindModule.lerp(1, 2, 0.5));
});