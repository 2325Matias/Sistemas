window.onload = function(){
    generateCalendar();
};

function generateCalendar(){
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDayOfMonth = new Date(year,month,1);
    const lastDayOfMonth = new Date(year,month+1,0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Agregar los nombres de los días de la semana
    for (let day of daysOfWeek) {
        let dayName = document.createElement("div");
        dayName.className = "day-name";
        dayName.textContent = day;
        calendar.appendChild(dayName);
    }
    
    for (let i=0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    for (let day=1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }
}

function showAddTaskModal(){
    document.getElementById('addTaskModal').style.display = 'block';
}

function closeAddTaskModal(){
    document.getElementById('addTaskModal').style.display = 'none';
}

function deleteTask(taskElement){
    if(confirm("Are you sure you want to delete this task?")){
        taskElement.parentNode.removeChild(taskElement);
    }
}

function editTask(taskElement){
    const newTaskDesc = prompt("Edit you Task:", taskElement.textContent);
    if(newTaskDesc != null & newTaskDesc.trim() != ""){
        taskElement.textContent = newTaskDesc;
    }
}

function addTask(){
    // Extraer año, mes y día como números desde el campo de fecha
    const dateValue = document.getElementById('task-date').value;
    const [year, month, day] = dateValue.split('-').map(Number); // Descomponer fecha seleccionada
    const taskDate = new Date(year, month - 1, day); // Crear la fecha en zona local

    const taskDesc = document.getElementById('task-desc').value.trim();

    if( taskDesc && !isNaN(taskDate.getDate())){
        const calendarDays = document.getElementById('calendar').children;
        for(let i = 0; i < calendarDays.length; i++){
            const dayElement = calendarDays[i];
            if(parseInt(dayElement.textContent) === taskDate.getDate()){
                const taskElement = document.createElement("div");
                taskElement.className = "task";
                taskElement.textContent = taskDesc;

                // Añadir evento para eliminar la tarea con clic derecho
                taskElement.addEventListener("contextmenu", function(event){
                    event.preventDefault();
                    deleteTask(taskElement);
                })

                // Añadir evento para editar la tarea con clic izquierdo
                taskElement.addEventListener('click', function(){
                    editTask(taskElement);
                })

                dayElement.appendChild(taskElement);
                break;
            }
        }
        closeAddTaskModal();
    } else {
        alert("Please enter a valid date and task description!");
    }
}