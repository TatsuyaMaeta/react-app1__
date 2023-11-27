import React, { useEffect, useState } from "react";
import axios from "axios";

const DrfAPIFetch = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [editedTask, setEditedTask] = useState({ id: "", title: "" });
    const [id, setId] = useState(1);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/tasks/", {
                headers: {
                    Authorization:
                        "Token z91de8e9bb7c1468329521ff108247fff31174b72",
                },
            })
            .then((res) => {
                setTasks(res.data);
            });
    }, []);

    // タスクを取得する関数
    const getTask = () => {
        axios
            .get(`http://127.0.0.1:8000/api/tasks/${id}`, {
                headers: {
                    Authorization:
                        "Token z91de8e9bb7c1468329521ff108247fff31174b72",
                },
            })
            .then((res) => {
                setSelectedTask(res.data);
            });
    };
    const deleteTask = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
                headers: {
                    Authorization:
                        "Token 9741e5fd90fe1b56de2c7399da63e3e0fddab003",
                },
            })
            .then((res) => {
                setTasks(tasks.filter((task) => task.id !== id));
                //
                setSelectedTask([]);
            });
    };

    const newTask = (task) => {
        const data = { title: task.title };

        // axiosの時のpostのルール
        // 第一引数：URL
        // 第二引数：setしたいobject
        // 第三引数：header情報のobject
        axios
            .post(`http://127.0.0.1:8000/api/tasks/`, data, {
                // postやputの場合、headerに追加情報が必要
                headers: {
                    Authorization:
                        "Token z91de8e9bb7c1468329521ff108247fff31174b72",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setTasks([...tasks, res.data]);
                // createボタンの入力内容をブランクに戻す
                setEditedTask({ id: "", title: "" });
            });
    };

    // 編集
    const editTask = (task) => {
        // axiosの時のpostのルール
        // 第一引数：URL
        // 第二引数：setしたいobject
        // 第三引数：header情報のobject
        axios
            .put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
                // postやputの場合、headerに追加情報が必要
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Token z91de8e9bb7c1468329521ff108247fff31174b72",
                },
            })
            .then((res) => {
                setTasks(
                    tasks.map((task) =>
                        task.id === editedTask.id ? res.data : task
                    )
                );
                setEditedTask({ id: "", title: "" });
            });
    };

    const handleInputChange = () => (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedTask({ ...editedTask, [name]: value });
    };

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        id:{task.id}
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <button onClick={() => setEditedTask(task)}>
                            <i className="fas fa-pen"></i>
                        </button>
                    </li>
                ))}
            </ul>
            Set id <br />
            <input
                type="text"
                value={id}
                onChange={(evt) => {
                    setId(evt.target.value);
                }}
                id="ipt"
            />
            <button type="button" onClick={() => getTask()}>
                Get Task
            </button>{" "}
            {/* <button type="button" onClick={() => deleteTask()}>
                Delete Task
            </button> */}
            <div>
                <h3>
                    {selectedTask.title} {selectedTask.id}
                </h3>
            </div>
            <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange()}
                placeholder="New Task ?"
                required
            />
            {editedTask.id ? (
                <button onClick={() => editTask(editedTask)}>Update</button>
            ) : (
                <button onClick={() => newTask(editedTask)}>Create</button>
            )}
        </div>
    );
};

export default DrfAPIFetch;
