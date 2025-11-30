let data = [
    {
        task: 'Run 2km',
        is_complete: true,
    },
    {
        task: 'Learn JsBeginner',
        is_complete: true,
    }
];
const Jerry_TODOLIST_APP = 'Jerry_TODOLIST_APP';
const saveData = (data) => {
    localStorage.setItem(Jerry_TODOLIST_APP, JSON.stringify(data));
}

// saveData(data);

const loadData = () => {
    var data;
    data = JSON.parse(localStorage.getItem(Jerry_TODOLIST_APP));
    data = data ? data : [];
    return data;
}


addTask = (new_task) => {
    data = loadData();
    data = [...data, new_task];
    saveData(data);
};

const createTaskItem = (task, is_complete, index) => {
    return `
    <li onlick="t()"  class="task_item" index=${index} is_complete=${is_complete}>
        <span onclick='markTaskComplete(${index})' class="task">${task}</span>
        <div class="task_action">
            <button onclick="pushEditTask(${index})">
                <i class="fa fa-pencil"></i>
            </button>
            <button  onclick="deleteTask(${index})">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </li> 
    `;
}

renderTasks = () => {
    var data, rs,count_complete;
    const task_rs=document.querySelector('span#task_rs');
    const ulListTask = document.querySelector('ul#list_task');
    data = loadData();
    count_complete=0;
    rs = data.map((element, index) => {
        if(element.is_complete=='true')
            count_complete++;
        return createTaskItem(element.task, element.is_complete, index);
    })
    if(count_complete>0)
    {
        task_rs.innerHTML= `Yeah, ${count_complete} task completed.`;
    }
    if(count_complete>1)
    {
        task_rs.innerHTML= `Yeah, ${count_complete} tasks completed.`;
    }
    // task_rs.innerHTML= count_complete>0?`Yeah, ${count_complete} task completed.`:'';
    ulListTask.innerHTML = rs.join('');
};
renderTasks();


const markTaskComplete = (index) => {
    var data = loadData();
    data[index].is_complete = data[index].is_complete == 'true' ? 'false' : 'true';
    saveData(data);
    renderTasks();
};

const deleteTask = (index) => {
    var delete_confirm = confirm('Do you want to delete this task?');
    if (delete_confirm == false) return false;
    data = loadData();
    data.splice(index, 1);
    saveData(data);
    renderTasks();
}

const pushEditTask = (index) => {
    const inputTaskText = document.querySelector('input#inputTaskText');
    const btnAdd = document.querySelector('button#btn_task');
    data = loadData();
    inputTaskText.value = data[index].task;
    inputTaskText.setAttribute('index', index);
    btnAdd.innerText = 'SAVE';
    // btnAdd.dataset.index=index;
}
const saveTask = (task, index) => {
    data = loadData()
    data[index].task = task;
    saveData(data);
    btnAdd.innerText = 'ADD TASK';
};
let frmAdd = document.forms.frmCreateTask;
let btnAdd = document.querySelector('button#btn_task');
frmAdd.addEventListener('submit', function (e) {
    const inputText = document.querySelector('input#inputTaskText');
    const index = inputText.getAttribute('index');
    update_task = inputText.value;
    if(inputText.value.length<2)
    {
        alert('You need to enter two words or more!');
        return false;
    }
    if (index) {
        saveTask(update_task, index);
        inputText.removeAttribute('index');
    }
    else {
        var new_task = {
            task: inputText.value,
            is_complete: false,
        };
        addTask(new_task);
    }

    e.preventDefault();
    renderTasks();
    inputText.value = '';
})
document.addEventListener('keyup',(e)=>{
    // console.log(e.which) ;
    const inputText = document.querySelector('input#inputTaskText');
    if(e.which==27)
    {
        // const index = inputText.getAttribute('index');
        const btnAdd = document.querySelector('button#btn_task');
        btnAdd.innerText="ADD TASK";
        inputText.removeAttribute('index');
        inputText.value='';

    }
})