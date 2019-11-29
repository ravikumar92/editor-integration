import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Font from '@ckeditor/ckeditor5-font/src/font';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';


import info from '../data/info';



let list = [];
function variableList() {
    Object.keys(info).map((keys) => {
        list.push('{' + keys + '}');
    })
}

variableList();
export const editorConfiguration = {
    fontSize: {
        options: [
            9,
            11,
            13,
            'default',
            17,
            19,
            21
        ]
    },

    plugins: [Essentials, Bold, Italic, Paragraph, Font, Mention,HorizontalLine,Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize,ImageUpload ],
    mention: {
        feeds: [
            {
                marker: '{',
                feed: list,
            }
        ]
    },
    toolbar: ['heading', '|', 'bold', 'italic', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor','|','imageUpload', 'imageTextAlternative','imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight','|', 'undo', 'redo','horizontalLine']
};