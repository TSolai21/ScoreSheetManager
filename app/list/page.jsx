"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { tableTitles } from "@/lib/Datas";
import "@/app/styles/_list.scss";
import Button from "@/Components/Button/Button";
import toast from "react-hot-toast";
import { fetchStudent } from "../Redux/ListSlice";
import ListSlice from "../Redux/ListSlice";

const List = () => {
  const [id, setId] = useState("");

  const { isError, data } = useSelector((state) => state.list);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    setSelectedData(data);
  }, [data]);

  const [error, setError] = useState(false);

  const handleUserSearch = (e) => {
    const { value } = e.target;
    setId(value);
  };

  useEffect(() => {
    setError(false);
  }, []);

  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(id);

    if (id) {
      dispatch(fetchStudent(id));
      setError("");
    } else {
      setError("Please Enter Reg No");
    }
  };

  useEffect(() => {
    if (isError) {
      setError("Account doesn't exist!");
      setSelectedData([]);
    } else {
      setError("");
    }
  }, [isError]);

  const [isOpen, setIsopen] = useState(false);
  const handleDelete = (id) => {
    dispatch(removeStudent(id));
    dispatch(ListSlice.actions.resetData());
    setIsopen(false);
    setId("");
    toast.success("Student deleted Successfully");
  };

  useEffect(() => {
    dispatch(ListSlice.actions.resetData());
    dispatch(ListSlice.actions.resetError());
  }, []);

  const handleCloseModal = () => {
    setIsopen(false);
  };

  const router = useRouter();
  const handleEdit = () => {
    const queryString = new URLSearchParams({ _id: id }).toString();
    router.push(`/update?${queryString}`);
  };
  return (
    <>
      <div className={"list"}>
        <div className={"title"}>
          <h1>Student</h1>
        </div>

        <div className={"search"}>
          <div className={"left"}>
            <p>Reg.No</p>
          </div>
          <div className={"right"}>
            <form onSubmit={handleFormSubmit}>
              <input
                type="string"
                value={id}
                onChange={handleUserSearch}
                style={{ borderColor: error ? "red" : "" }}
              />
              {error && <small>{error}</small>}

              <div className={"actionBtns"}>
                <Button type="submit">Search</Button>
                {!!selectedData && (
                  <>
                    <Button call={handleEdit}>Edit</Button>
                    <Button call={setIsopen} arg={!isOpen}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        {!!selectedData && (
          <div className={"result"}>
            <table>
              <tbody>
                {tableTitles &&
                  tableTitles.map(({ text, sortTerm }, i) => {
                    return (
                      <tr key={i}>
                        <th>
                          <span>{text}</span>
                        </th>
                        <td>{selectedData[sortTerm]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isOpen && (
        <>
          <div className="overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <p>Are you sure want to delete?</p>
            <div className="actions">
              <Button call={handleDelete} arg={id}>
                Ok
              </Button>
              <Button call={handleCloseModal}>Cancel</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default List;
