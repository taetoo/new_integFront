// 반응형 토글
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
// const links = document.querySelector('.navbar_links');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    // links.classList.toggle('active');
})


// const fileInput = document.getElementById("chooseFile");
// // 또는 const fileInput = $("#fileUpload").get(0);

// fileInput.onchange = () => {
//   const selectedFile = [...fileInput.files];
//   console.log(selectedFile);
// };
var num = 0;
var filesArr = new Map();

// 파일업로드
function DropFile(dropAreaId, fileListId) {
    let dropArea = document.getElementById(dropAreaId);
    let fileList = document.getElementById(fileListId);
    
    // 기존 브라우저 drag&drop 이벤트 막기
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // drop 파일 영역에 하이라트 효과
    function highlight(e) {
      preventDefaults(e);
      dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
      preventDefaults(e);
      dropArea.classList.remove("highlight");
    }


    // drop 파일 영역에 파일을 내려놨을 때 생기는 이벤트
    function handleDrop(e) {
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
        // console.log('filetest',files)
        const fileList = document.getElementById(fileListId);

        // console.log("fileList : ", fileList)

        if (fileList) {
          fileList.scrollTo({ top: fileList.scrollHeight });
        }
    }

    function handleFiles(files) {

        let copy = [...files];
        // copy.forEach(previewFile)
         copy.forEach((file, index) => {
             console.log('idx', index)
             previewFile(file, index)
         })

      

      // copy.forEach(setMap)
      // console.log(filesArr);
    }

    // function setMap(file){
    //   filesArr.set(num,file);
    //   num++;
    // }

    function previewFile(file, index) {
        // console.log('index', index)
        // console.log('file', file)
      fileList.appendChild(renderFile(file, index));
    }

    function renderFile(file, index) {
      let fileDOM = document.createElement("div");
      // console.log('file', fileDOM)
        let deleteDom = document.getElementsByClassName('fas fa-minus-square')

      fileDOM.className = "file";
      fileDOM.id = index
      console.log("domId_index : ", fileDOM.id)

      fileDOM.innerHTML = `
        <div class="thumbnail">
          <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입 이미지" class="image">
        </div>
        <div class="details">
          <header class="header">
            <span class="name">${file.name}</span>
            <span class="size">${file.size}</span>
          </header>
          <div class="progress">
            <div class="bar"></div>
          </div>
          <div class="status">
            <span class="percent">100% done</span>
            <span class="speed">90KB/sec</span>
          </div> 
          <a class="delete"><i onclick='remove_children(${index})' class="fas fa-minus-square" ></i></a>
        </div>
      `;
      return fileDOM;
    }
    dropArea.addEventListener("dragenter", highlight, false);
    dropArea.addEventListener("dragover", highlight, false);
    dropArea.addEventListener("dragleave", unhighlight, false);
    dropArea.addEventListener("drop", handleDrop, false);

    return {
      handleFiles
    };
  }

  const dropFile = new DropFile("drop-file", "files");

function remove_children(index) {
    console.log('node', index)
    const parent = document.getElementById('files')
    const child = document.getElementById(index)

    parent.removeChild(child)

    console.log('parent', parent)
  
    // console.log('child', parent.childNodes[index])

    // parent.removeChild(parent.getElementById(index));

    // filesArr -> index : 0,1,2,3
    // 삭제되고 나면 -> 0,1,2

    // 그런데 Node의 index값은 처음 초기 셋팅 값 그대로 그러면 매칭을 어떻게 해줘야지...?



    // 지우고 다시 index
    // filesArr.delete(num)
    // console.log('filesArr', filesArr)

    // filesArr.forEach((file, index) => )

    // num = childNodes.length-1

    // const parent = document.getElementById('files')
    // parent.removeChild(child.num)
    // filesArr.delete(num)


    // $('#file' + num).remove();
    // child.delete(num);
    // console.log(child)
}















// console.log(':**~                                                      ');
// console.log('~####-                                                    ');
// console.log('!####;                                                    ');
// console.log(';####:                                                    ');
// console.log(',$##=.                                                    ');
// console.log('.--                                                       ');
// console.log(' ,,,,   ,,,, .-~-.        ,-~~-.  ,,,,   .,,,.            ');
// console.log('~$$$$,  $$$$:$###$-     -=$####$.,$$$$~  *$$$!            ');
// console.log('~####, .##########$.   ;#######$.,$###~  *###!            ');
// console.log('~####, .###########:  :########$.,$###~  *###!            ');
// console.log('~####, .#####$=####=  =####$!!$$.,$###~  *###!            ');
// console.log('~####, .####*  *#### ,####*    , ,$###~  *###!            ');
// console.log('~####, .####~  !#### ;###$       ,$###~  *###!            ');
// console.log('~####, .####-  ;#### ;###$       ,$###~  *###!            ');
// console.log('~####, .####-  ;#### :####.      ,$###~  $###!            ');
// console.log('~####, .####-  ;#### ,####=.  .: .$###*.:####!            ');
// console.log('~####, .####-  ;####  =#####$$#$..$##########!            ');
// console.log('~####, .####-  ;####  -########$. =##########!            ');
// console.log('~####, .####-  ;####   ~$######$. ,$#####=###!            ');
// console.log('-$$$$,  $$$$-  ;$$$$    .*$$##$=.  -$$$$;-$$$!            ');
// console.log('                          .,,,.      ,,.                  ');
