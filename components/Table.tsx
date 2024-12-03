import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface DataItem {
  id: number;
  name: string;
}

const Table: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DataItem | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setData(JSON.parse(savedData)); 
    }
  }, []);

  const handleAdd = () => {
    if (newItem.trim()) {
      const newData = [...data, { id: Date.now(), name: newItem }];
      setData(newData);
      localStorage.setItem("data", JSON.stringify(newData)); 
      setNewItem("");
      setIsModalOpen(false);
    }
  };

  const handleEdit = () => {
    if (editItem && editItem.name.trim()) {
      const updatedData = data.map((item) =>
        item.id === editItem.id ? { ...item, name: editItem.name } : item
      );
      setData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData)); 
      setEditItem(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData)); 
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
     <>
     <nav className="bg-slate-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-between">
      
      <div className="text-xl font-bold"><span className="text-sky-400 text-2xl">Table list</span></div>

     

      {/* Profile Section */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">John Doe</span>
        <img
          src="https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png"
          alt="Profile"
          className="rounded-full w-10 h-10 border-2 border-white shadow-md"
        />
      </div>
    </nav>
    
    <div className="p-8 bg-gray-100 min-h-screen">
     
      <div className="flex justify-between">
      <div className="flex items-center bg-gray-200 rounded-full shadow-inner px-3 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-800 px-2 w-48"
        />
        <button className="text-gray-600 hover:text-blue-500">
          🔍
        </button>
      </div>
      <div className="">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600"
      >
        Add Item
      </button>
      </div>
      </div>
      <table className="w-full mt-6 bg-white shadow-md rounded border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border text-center">ID</th>
            <th className="px-4 py-2 border text-center">Name</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border text-center">{item.id}</td>
              <td className="px-4 py-2 border text-center">{item.name}</td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => {
                    setEditItem(item);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-green-300 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item"
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    
      {isEditModalOpen && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <input
              type="text"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
              placeholder="Update item"
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleEdit}
                className="bg-green-300 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Table;
