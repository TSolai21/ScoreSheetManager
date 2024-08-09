"use client";
import CommonForm from "Components/CommonForm/CommonForm";
import { inputs } from "@/lib/Datas";

const Add = () => {
  const formValue = {
    Name: "",
    Email: "",
    "Phone Number": "",
    Gender: "Female",
    Standard: "10",
    "Mark 1": "",
    "Mark 2": "",
    "Mark 3": "",
    "Mark 4": "",
    "Mark 5": "",
    Comments: "",
  };
  return (
    <>
      <CommonForm type={"add"} inputs={inputs} formValue={formValue} />
    </>
  );
};

export default Add;
