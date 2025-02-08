import { useEffect, useState } from 'react'
import { Check, Edit, Trash } from "lucide-react";
const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null)
  const [task, setTask] = useState({
    id: '', 
    name: '',
    created : '',
    completed: false
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name.trim()) return;
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { ...task}]);
    }
    setTask({ id: "", name: "", completed: false });
  };
  const handleChange = (e) => {
    setTask({...task, name: e.target.value, created: new Date().toLocaleString()})
  }
  const editTask = (index) => {
    setTask(tasks[index])
    setEditingIndex(index);
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((t, i) => i !== index))
  }

  const completeTask = (index) => {
    setTasks(tasks.map((t, i) => i === index ? {...t, completed: !t.completed} : t))
  }

  const handleFilter = (e) => {
    switch (e) {
      case "terminé":
        setFilteredTasks(tasks.filter((t) => t.completed));
        break;
      case "en cours":
        setFilteredTasks(tasks.filter((t) => !t.completed));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  const handleSort = (e) => {
    const sortedTasks = [...tasks];
    switch (e) {
      case "name-asc":
        sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedTasks.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "completed":
        sortedTasks.sort((a, b) => b.completed - a.completed);
        break;
      case "recent":
        sortedTasks.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case "ancien":
        sortedTasks.sort((b, a) => new Date(b.created) - new Date(a.created));
        break;
      default:
        break;
    }
    setTasks(sortedTasks);
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-5'>Listes de Taches</h1>

      <form onSubmit={handleSubmit}>
        <label className="block text-left mb-3" htmlFor="Name">Nom du Tache</label>
        <div className='w-full flex'>
          <input type="text" className="w-full px-2 py-2 bg-gray-100 rounded text-black" placeholder='Entrer le nom de la tache' onChange={handleChange} value={task.name}/>
          <button type='submit' className='bg-green-500 text-white px-2 py-2 rounded mx-1 cursor-pointer'>Envoyer</button>
        </div>
      </form>

      <div className='w-full flex justify-between gap-3 my-3'>

        <div className="w-full flex items-center bg-gary-900 ">
            <select
            className="w-full flex px-3  py-2 bg-gary-900 border rounded"
            onChange={(e) => handleSort(e.target.value)}
            >
            <option value="" className='text-black'>Trier par...</option>
            <option value="name-asc" className='text-black'>Nom (A-Z)</option>
            <option value="name-desc" className='text-black'>Nom (Z-A)</option>
            <option value="completed" className='text-black'>Complété en premier</option>
            <option value="recent" className='text-black'>Date Ascendant</option>
            <option value="ancien" className='text-black'>Date Descendant</option>
            </select>
        </div>

        <div className="w-full flex items-center bg-gary-900">
            <select
            className="flex-1 px-3 py-2 bg-gary-900 border rounded"
            onChange={(e) => handleFilter(e.target.value)}
            >
            <option value="" className='text-black'>Filtrer par...</option>
            <option value="terminé" className='text-black'>Terminé</option>
            <option value="en cours" className='text-black'>En cours</option>
            </select>
        </div>

      </div>

    
      <table className="min-w-full border-collapse border border-gray-300 my-3">
        <thead>
          <tr className="bg-gray-200 text-black my-5">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2 text-left">Tâche</th>
            <th className="px-4 py-2">Date de création</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index} className="">
              <td className="px-4 py-2">{index + 1}</td>
              <td className={`px-4 py-2 text-left ${task.completed ? 'line-through text-blue-400' : ''}`}>{task.name}</td>
              <td className={`px-4 py-2 text-center ${task.completed ? 'line-through text-blue-400' : ''}`}>{task.created}</td>
              <td className="flex justify-center items-center px-2 py-2">
                <Trash className="bg-red-500 text-white w-9 h-9 px-2 py-1 rounded mx-1 cursor-pointer" onClick={() => deleteTask(index)}/>
                <Edit className='bg-yellow-500 text-white w-9 h-9 px-2 py-1 rounded mx-1 cursor-pointer' onClick={() => editTask(index)}/>
                <Check className='bg-blue-500 text-white w-9 h-9 px-2 py-1 rounded mx-1 cursor-pointer' onClick={() => completeTask(index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}

export default TodoList
