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
        if(addFile(files)){
          handleFiles(files);
          console.log('드롭다운시 파일목록',files)
          const fileList = document.getElementById(fileListId);
  
          console.log("드롭다운시 파일html : ", fileList)
  
          if (fileList) {
            fileList.scrollTo({ top: fileList.scrollHeight });
          }
        } else{
          alert("드롭다운 파일은 4개까지만 첨부가능")
        }

        
    }

    // 첨부파일 갯수 검증
    function addFile(files){
      let maxFileCnt = 5;   // 첨부파일 최대 개수
      const attFileCnt = document.getElementById('files').childElementCount //기존 파일 첨부 개수
      console.log("기존 추가 첨부파일", attFileCnt)

      let remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
      console.log("추가첨부가능",remainFileCnt)
    
      let curFileCnt = files.length;  // 현재 선택된 첨부파일 개수

      console.log("현재선택", curFileCnt)
      // console.log(curFileCnt)
        
      if(curFileCnt > remainFileCnt){
          return false;
  
        } else{
          return true;
        }

    
    }
    
    function handleFiles(files) {
      console.log(files)
          if(addFile(files)){
            let copy = [...files];
            // copy.forEach(previewFile)
             copy.forEach((file, index) => {
                //  console.log('idx', index)
                 previewFile(file, index)
             })
          } else {
            alert("choosefile 안됨")
          }
         

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
      fileDOM.id = "fileIndex" + index;
      // console.log("domId_index : ", fileDOM.id)

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
    const child = document.getElementById("fileIndex" + index)

    parent.removeChild(child)

    console.log('parent', parent)
  
    
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
