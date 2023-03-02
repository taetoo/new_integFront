// 반응형 토글
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
// const links = document.querySelector('.navbar_links');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    // links.classList.toggle('active');
})

// 파일 저장 맵
let fileArr = new Map();
let mapKey = 0;

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

        console.log("filesTest",files)

        // console.log(files)
        if(addFile(files)){
          let show = document.getElementById("send-box")
          if(show.style.display == "none"){
            show.style.display == "flex";
          } else {
            show.style.display == "none"; 
          }

          handleFiles(files);

          // console.log('드롭다운시 파일목록',files)
          const fileList = document.getElementById(fileListId);
  
          // console.log("드롭다운시 파일html : ", fileList)
  
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
      let attFileCnt = document.getElementById('files').childElementCount //기존 파일 첨부 개수

      // let file = document.getElementById('files').children
      // console.log(file)


      let curFileCnt = files.length;  // 현재 선택된 첨부파일 개수
      let remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
        
      if(curFileCnt > remainFileCnt){
          return false;
  
        } else{
          return true;
        }

    
    }


/* 첨부파일 검증 */
// function validation(files) {
//   if (obj.name.length > 100) {
//       alert("파일명이 100자 이상인 파일은 제외되었습니다.");
//       return false;
//   } else if (obj.size > (100 * 1024 * 1024)) {
//       alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
//       return false;
//   } else if (obj.name.lastIndexOf('.') == -1) {
//       alert("확장자가 없는 파일은 제외되었습니다.");
//       return false;
//   }
//   else if (fileNo != 0) {
//       for (let value of filesArr.values()) {
//           if (value.name == obj.name) {
//               alert("중복된 파일입니다.")
//               return false;
//           }
//       }
//       return true;
//   }
//   else {
//       return true;
//   }
// }

    function handleFiles(files) {
      
          if(addFile(files)){
            let copy = [...files];
            // copy.forEach(previewFile)
             copy.forEach((file) => {
              fileArr.set(mapKey, file)
                 previewFile(file, mapKey)
                 mapKey++;
                 console.log("fileArr:",fileArr)
             })
          } else {
            alert("choosefile 안됨")
          }
    }

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
    fileArr.delete(index)

    console.log('parent', parent)
    console.log(fileArr)
  
    
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
