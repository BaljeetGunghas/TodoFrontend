import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete, MdAddCircle, MdUpdate } from "react-icons/md";
import axios from 'axios';
import './App.css'
const Todo = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [edit, setEdit] = useState(false)
    const [editId, setEditid] = useState()

    useEffect(() => {
        axios.get("http://localhost:8080/register/user")
            .then(function (dataa) {
                console.log(dataa);
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [data])


    const btnAdd = () => {
        if (name.length > 0) {
            setData([{
                id: (Math.random() * 100000000000).toFixed(),
                item: name
            }, ...data]);
            setName("");
            setEdit(false)
        }
    }

    const delhendal = (id) => {
        console.log(id);
        let delarr = data.filter((item) => item.id !== id)
        setData(delarr);
    }
    const edithandle = (list) => {
        console.log(list.id);
        console.log(list.item);
        setName(list.item)
        setEdit(true)
        setEditid(list.id)
    }

    const btnEdit = () => {
        let edititem = data.findIndex((item) => item.id === editId)
        data[edititem].item = name;
        setData(data)
        setName("")
        setEdit(false)
    }


    return (
        <div className='App'>
            <div className='listMain'>
                <div className='btnsec'>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    {!edit ? <button onClick={btnAdd}>
                        <MdAddCircle /></button> : <button onClick={btnEdit}>
                        <MdUpdate /></button>}
                </div>
                <p className='List_item_Length'>Total Items: <span>{data.length}</span></p>
                <div className='list'>
                    {data.map((list) => {
                        return (
                            <div className={list.item === name ? 'main main-Active' : 'main'} key={list.id}>
                                <h2 >{list.item} </h2>
                                <>
                                    <span className='edit' onClick={() => edithandle(list)}>
                                        <FiEdit />
                                    </span>
                                    <span className='del' onClick={() => delhendal(list.id)}>
                                        <MdAutoDelete />
                                    </span>
                                </>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div >
    );
}

export default Todo;








