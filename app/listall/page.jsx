"use client";

import { useDispatch, useSelector } from "react-redux";
import StudentsSlice, { fetchStudents } from "../Redux/StudentsSlice";
import { useEffect, useState } from "react";
import useSort from "@/CustomHooks/UseSort";
import { tableTitles } from "@/lib/Datas";
import { imagePaths } from "@/ImageSources/ImageSources";
import Button from "@/Components/Button/Button";
import TableRow from "@/Components/TableRow/TableRow";
import "@/app/styles/_listall.scss";
import Image from "next/image";

const ListAll = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  const { data, itemsPerPage, currentPage, searchTerm } = useSelector(
    (state) => state.students
  );

  const getPaginatedData = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredData = data.slice(startIndex, endIndex);
    return {
      startIndex,
      endIndex,
      filteredData,
    };
  };

  const [wantedData, setWantedData] = useState(data);
  const { filteredData } = getPaginatedData(
    wantedData,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    setWantedData(data);
  }, [data]);

  useEffect(() => {
    const datas = data.filter((item) => {
      return item.name
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
    });
    setWantedData(datas);
    dispatch(StudentsSlice.actions.setCurrentPage(1));
  }, [searchTerm, data]);

  const totalpages = Math.ceil(wantedData.length / itemsPerPage);

  const handlePerPage = (e) => {
    const { value } = e.target;
    dispatch(StudentsSlice.actions.setItemsPerPage(+value));
  };

  const handlePrevPage = (page) => {
    if (page <= 1) return;
    dispatch(StudentsSlice.actions.setCurrentPage(page - 1));
  };
  const handleNextPage = (page) => {
    if (page >= totalpages) return;
    dispatch(StudentsSlice.actions.setCurrentPage(page + 1));
  };

  const {
    data: sortedData,
    sortKey,
    sortOrder,
    toggleSort,
  } = useSort(wantedData);

  const sortData = (key, order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    });

    return sortedData;
  };

  const [order, setOrder] = useState(false);

  const [arrow, setArrow] = useState(false);

  const handleArrow = (sortTerm) => {
    setOrder(!order);
    sortHandler(sortTerm, order, data);
    setArrow(!arrow);
  };

  function paginationBtns(current, total) {
    if (total <= 5) {
      return Array.from({ length: total }).map((_, i) => i + 1);
    }
    if (current < 6) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current > total - 3) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  }

  const [btns, setBtns] = useState([]);

  useEffect(() => {
    setBtns(paginationBtns(currentPage, totalpages));
  }, [currentPage, totalpages]);

  const handleFirstPage = (page) => {
    dispatch(StudentsSlice.actions.setCurrentPage(page));
  };
  const handlePageClick = (page) => {
    dispatch(StudentsSlice.actions.setCurrentPage(page));
  };
  const handleLastPage = (page) => {
    dispatch(StudentsSlice.actions.setCurrentPage(page));
  };

  const sortHandler = (sortTerm, order, data) => {
    if (order) {
      const sorted = [...data].sort((a, b) =>
        a[sortTerm] > b[sortTerm] ? 1 : -1
      );
      dispatch(StudentsSlice.actions.updateData(sorted));
    } else {
      const sorted = [...data].sort((a, b) =>
        a[sortTerm] < b[sortTerm] ? 1 : -1
      );
      dispatch(StudentsSlice.actions.updateData(sorted));
    }
  };

  return (
    <>
      <div className={"listall"}>
        <h1>All Students</h1>
        <div className={"studentsList"}>
          <table>
            <thead>
              <tr>
                {tableTitles &&
                  tableTitles.map(({ text, sortTerm }, i) => {
                    return i === 0 ? (
                      <th key={i} onClick={() => handleArrow(sortTerm)}>
                        <div className={"regNo"}>
                          <Image
                            src={imagePaths.arrow}
                            className={arrow ? "active" : ""}
                            alt="arrow image"
                          />
                          <span>{text}</span>
                        </div>
                      </th>
                    ) : (
                      <th key={i} onClick={() => handleArrow(sortTerm)}>
                        <span>{text}</span>
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((data, i) => {
                  return <TableRow data={data} key={i} />;
                })}
            </tbody>
          </table>
        </div>
        <div className={"actions"}>
          <div className={"perPage"}>
            <p>No of Rows Per Page</p>
            <select value={itemsPerPage} onChange={handlePerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className={"pageBtns"}>
            <Button call={handleFirstPage} arg={1}>
              &lt;&lt;
            </Button>
            <Button call={handlePrevPage} arg={currentPage}>
              &lt;
            </Button>
            {btns &&
              btns.map((data, i) => {
                return (
                  <Button
                    key={i}
                    className={data === currentPage ? "active" : ""}
                    call={data !== "..." ? handlePageClick : ""}
                    arg={data !== "..." ? data : ""}
                  >
                    {data}
                  </Button>
                );
              })}
            <Button call={handleNextPage} arg={currentPage}>
              &gt;
            </Button>
            <Button call={handleLastPage} arg={btns[btns.length - 1]}>
              &gt;&gt;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAll;
