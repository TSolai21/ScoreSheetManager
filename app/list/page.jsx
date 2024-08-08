"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSlice, { removeStudent } from "../Redux/ListSlice";
import { redirect, useRouter } from "next/navigation";
import Button from "@/Components/Button/Button";
import { tableTitles } from "@/lib/Datas";
import TableRow from "@/Components/TableRow/TableRow";
import DeleteProtal from "@/Portals/DeleteProtal/DeleteProtal";
import "@/app/styles/_list.scss";
import { fetchStudent } from "../Redux/StudentsSlice";

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
    if (id) {
      dispatch(fetchStudent(id));
    } else {
      setError("Please Enter Reg No");
    }
  };

  useEffect(() => {
    setError(isError ? "account doesn't exist!" : "");
  }, [isError]);

  const [isOpen, setIsopen] = useState(false);
  const handleDelete = (id) => {
    dispatch(removeStudent(id));
    dispatch(ListSlice.actions.resetData());
    setIsopen(false);
    setId("");
  };

  useEffect(() => {
    dispatch(ListSlice.actions.resetData());
    dispatch(ListSlice.actions.resetError());
  }, []);

  const handleCloseModal = () => {
    setIsopen(false);
  };

  //   const navigate = redirect();
  const router = useRouter();
  const handleEdit = () => {
    const queryString = new URLSearchParams({ _id: id }).toString();
    router.push(`/update?${queryString}`);
    // navigate("/update", { state: { data: selectedData, id } });
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

        {/* {!!selectedData && (
          <div className={"result"}>
            <table>
              <thead>
                <tr>
                  {tableTitles &&
                    tableTitles.map(({ text, sortTerm }, i) => {
                      return (
                        <th key={i}>
                          <span>{text}</span>
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {selectedData &&
                  [selectedData].map((data, i) => {
                    return <TableRow data={data} key={i} />;
                  })}
              </tbody>
            </table>
          </div>
        )} */}
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

      <DeleteProtal
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        isOpen={isOpen}
        id={id}
      />

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
