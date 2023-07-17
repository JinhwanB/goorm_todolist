window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  let todos = [];

  const savedTodos = localStorage.getItem("tasks");

  //저장된 todo 보여주기
  if (savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(function (str) {
      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      task_el.appendChild(task_content_el);

      const task_input_el = document.createElement("input"); // input 창으로 만드는 이유는 수정 또한 같이 이루어지게 하기 위함
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = str;
      task_input_el.setAttribute("readonly", "readonly"); // readonly 속성을 넣어줌(수정 불가능)
      task_input_el.setAttribute("autocomplete", "off");
      task_input_el.addEventListener("click", function () {
        //할일 완료 후 클릭시 밑줄로 표시
        if (task_input_el.style.color === "") {
          task_input_el.style.textDecoration = "line-through";
          task_input_el.style.color = "gray"; //클릭시 색변환
        } else {
          task_input_el.style.textDecoration = "";
          task_input_el.style.color = ""; //클릭시 색변환
        }
      });

      task_content_el.appendChild(task_input_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerText = "수정";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerText = "삭제";

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);

      task_el.appendChild(task_actions_el);

      list_el.appendChild(task_el);

      let idx = 0;
      task_edit_el.addEventListener("click", () => {
        // 수정 이벤트
        if (task_edit_el.innerText === "수정") {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerText = "저장";
          todos.forEach((str, index) => {
            if (str === task_input_el.value) {
              idx = index;
            }
          });
        } else {
          task_input_el.setAttribute("readonly", "readonly");
          task_edit_el.innerText = "수정";
          todos[idx] = task_input_el.value;
          localStorage.setItem("tasks", JSON.stringify(todos));
        }
      });

      task_delete_el.addEventListener("click", () => {
        // 삭제 이벤트
        todos.forEach((str, index) => {
          if (str === task_input_el.value) {
            todos.splice(index, 1);
          }
        });
        localStorage.setItem("tasks", JSON.stringify(todos));
        list_el.removeChild(task_el);
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    if (!task) {
      // 아무것도 적지 않고 Add할 시
      alert("오늘 할 일을 적어주세요"); // 경고창 띄우고
      return; // 아무것도 실행하지 않음
    }

    // todolist를 localstorage에 저장하는 부분
    todos.push(task);
    localStorage.setItem("tasks", JSON.stringify(todos));
    // todolist를 localstorage에 저장하는 부분 끝

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input"); // input 창으로 만드는 이유는 수정 또한 같이 이루어지게 하기 위함
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly"); // readonly 속성을 넣어줌(수정 불가능)
    task_input_el.setAttribute("autocomplete", "off");
    task_input_el.addEventListener("click", function () {
      //할일 완료 후 클릭시 밑줄로 표시
      if (task_input_el.style.color === "") {
        task_input_el.style.textDecoration = "line-through";
        task_input_el.style.color = "gray"; //클릭시 색변환
      } else {
        task_input_el.style.textDecoration = "";
        task_input_el.style.color = ""; //클릭시 색변환
      }
    });

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "수정";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "삭제";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    input.value = ""; // todo를 add 한 후에 input창을 비워둔다.

    task_edit_el.addEventListener("click", () => {
      // 수정 이벤트
      if (task_edit_el.innerText === "수정") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "저장";
        todos.forEach((str, index) => {
          if (str === task_input_el.value) {
            idx = index;
          }
        });
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "수정";
        todos[idx] = task_input_el.value;
        localStorage.setItem("tasks", JSON.stringify(todos));
      }
    });

    task_delete_el.addEventListener("click", () => {
      // 삭제 이벤트
      todos.forEach((str, index) => {
        if (str === task_input_el.value) {
          todos.splice(index, 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(todos));
      list_el.removeChild(task_el);
    });
  });
});
