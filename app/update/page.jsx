"use client";
import CommonForm from "@/Components/CommonForm/CommonForm";
import { inputs } from "@/lib/Datas";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../Redux/ListSlice";

const Update = () => {
  //   const { state } = useLo();
  const searchParams = useSearchParams();
  const id = searchParams.get("_id");
  const router = useRouter();
  // const { data } = router;

  const [datas, setDatas] = useState("");
  const { isError, data } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudent(id));
  }, [id]);
  useEffect(() => {
    setDatas(data);

    console.log(data, "data id");
  }, [data]);

  // const { data, id } = { data: "", id: 1 };
  //   const { data, id } = state;
  const formValue = {
    Name: datas?.name,
    Email: datas?.email,
    "Phone Number": datas?.phone,
    Gender: datas?.gender,
    Standard: datas?.standard,
    "Mark 1": datas?.tamil,
    "Mark 2": datas?.english,
    "Mark 3": datas?.maths,
    "Mark 4": datas?.science,
    "Mark 5": datas?.social_science,
    Comments: datas?.comments,
  };

  console.log(formValue, "data form value");

  return (
    <>
      <CommonForm
        type={"update"}
        id={id}
        inputs={inputs}
        formValue={formValue}
      />
    </>
  );
};

export default Update;
