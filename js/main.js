// 반응형 토글
const toggleBtn = document.querySelector(".navbar_toggleBtn");
const menu = document.querySelector(".navbar_menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

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

    if (addFile(files)) {
      let show = document.getElementById("send-box");
      if (show.style.display == "none") {
        show.style.display == "flex";
      } else {
        show.style.display == "none";
      }

      handleFiles(files);
      const fileList = document.getElementById(fileListId);

      if (fileList) {
        fileList.scrollTo({ top: fileList.scrollHeight });
      }
    } else {
      alert("드롭다운 파일은 4개까지만 첨부가능");
    }
  }

  // 첨부파일 갯수 검증
  function addFile(files) {
    let maxFileCnt = 5; // 첨부파일 최대 개수
    let attFileCnt = document.getElementById("files").childElementCount; //기존 파일 첨부 개수
    let curFileCnt = files.length; // 현재 선택된 첨부파일 개수
    let remainFileCnt = maxFileCnt - attFileCnt; // 추가로 첨부가능한 개수

    if (curFileCnt > remainFileCnt) {
      return false;
    } else {
      return true;
    }
  }

  /* 첨부파일 검증 */
  function handleFiles(files) {
    if (addFile(files)) {
      let copy = [...files];
      copy.forEach((file) => {
        //  console.log("file",file)
        if (file.name.length > 100) {
          alert("파일명이 100자 이상인 파일은 제외되었습니다.");
          return false;
        } else if (file.size > 100 * 1024 * 1024) {
          alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
          return false;
        } else if (file.name.lastIndexOf(".") == -1) {
          alert("확장자가 없는 파일은 제외되었습니다.");
          return false;
        }
        // console.log("파일명",file.name)
        for (let value of fileArr.values()) {
          if (value.name == file.name) {
            alert("중복된 파일입니다.");
            return false;
          }
        }
        fileArr.set(mapKey, file);
        previewFile(file, mapKey);
        mapKey++;
        return true;
      });
    } else {
      alert("choosefile 안됨");
    }
    // 클릭 이벤트 초기화 함수
    document.querySelector("input[type=file]").value = "";
  }

  function previewFile(file, mapKey) {
    fileList.appendChild(renderFile(file, mapKey));
  }

  function renderFile(file, mapKey) {
    let fileDOM = document.createElement("div");
    // console.log('file', fileDOM)
    let deleteDom = document.getElementsByClassName("fas fa-minus-square");

    fileDOM.className = "file";
    fileDOM.id = "fileIndex" + mapKey;

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
          <a class="delete"><i onclick='remove_children(${mapKey})' class="fas fa-minus-square" ></i></a>
        </div>
      `;
    return fileDOM;
  }

  dropArea.addEventListener("dragenter", highlight, false);
  dropArea.addEventListener("dragover", highlight, false);
  dropArea.addEventListener("dragleave", unhighlight, false);
  dropArea.addEventListener("drop", handleDrop, false);

  return {
    handleFiles,
  };
}

const dropFile = new DropFile("drop-file", "files");

function remove_children(mapKey) {
  // console.log('node', index)
  const parent = document.getElementById("files");
  const child = document.getElementById("fileIndex" + mapKey);

  parent.removeChild(child);
  fileArr.delete(mapKey);
}

$(function () {
  $("#send-file").on("click", function () {
    FunLoadingBarStart();
    uploadFile();
  });
});

function uploadFile() {
  const currentDate = document.getElementById("currentDate").value;
  if (fileArr.size !== 0) {
    let formData = new FormData();
    if (currentDate !== "") {
      for (const value of fileArr.values()) {
        formData.append("attach_file", value);
        formData.append("date", currentDate);
      }
      $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
      }).done(function (data) {
        cancelIdleCallback(data);
        let response = "";
        for (let i = 0; i < data.length; i++) {
          response +=
            i +
            1 +
            ". 파일명: " +
            data[i].fileName +
            ", 사이즈: " +
            data[i].fileSize +
            "\n";
        }
        alert(response);
        location.href = "result";
      });
    } else {
      alert("날짜를 입력해주세요!");
      location.reload();
    }
    console.log("date", currentDate);
  } else {
    alert("첨부된 파일이 없습니다.");
    location.reload();
  }
}

function FunLoadingBarStart() {
  let backHeight = $(document).height(); // 뒷 배경의 상하 폭
  let backWidth = window.document.body.clientWidth; // 뒷 배경의 좌우 폭

  let backGroundCover = "<div id='back'></div>"; // 뒷 배경을 감쌀 커버
  let loadingBarImage = ""; // 가운데 띄워 줄 이미지

  loadingBarImage += "<div id='loadingBar'>";
  loadingBarImage += "     <img src='./images/loadingbar.gif'/>"; // 로딩 바 이미지
  loadingBarImage += "</div>";
  loadingBarImage +=
    "<div id='noticeMessage'><p>진행중입니다. 페이지에서 벗어나지 마십시오.</p></div>";

  $("body").append(backGroundCover).append(loadingBarImage);

  $("#back").css({ width: backWidth, height: backHeight, opacity: "0.3" });
  $("#back").show();
  $("#loadingBar").show();
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
