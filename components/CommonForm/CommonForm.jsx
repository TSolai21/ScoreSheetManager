import "@/app/styles/components/_form.scss";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DropDown from "../DropDown/DropDown";
import Button from "../Button/Button";
import { addStudent, editStudent } from "@/app/Redux/AddSlice";
const CommonForm = ({ type, inputs, formValue, id }) => {
  const [formValues, setFormValues] = useState(formValue);
  const [formErrors, setformErrors] = useState({});
  const [allSuccess, setallSuccess] = useState(false);
  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const form = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setallSuccess(true);
    // console.log(validate(formValues), "val");
  };

  const validate = (values) => {
    const errors = {};
    const isEmail = (value) => {
      return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
    };

    if (values["Name"] === "") {
      errors.Name = "Password is required!";
    }

    if (values.Email === "") {
      errors.Email = "Email is Required!";
    } else if (!isEmail(values.Email)) {
      errors.Email = "Please enter a valid email format!";
    }

    if (values["Phone Number"] === "") {
      errors["Phone Number"] = "number is required!";
    } else if (
      values["Phone Number"].length > 10 ||
      values["Phone Number"].length < 10
    ) {
      errors["Phone Number"] = "Please Enter valid number";
    }

    if (values["Mark 1"] === "") {
      errors["Mark 1"] = "mark is required!";
    } else if (values["Mark 1"] > 100) {
      errors["Mark 1"] = "Please Enter valid mark";
    }

    if (values["Mark 2"] === "") {
      errors["Mark 2"] = "mark is required!";
    } else if (values["Mark 2"] > 100) {
      errors["Mark 2"] = "Please Enter valid mark";
    }

    if (values["Mark 3"] === "") {
      errors["Mark 3"] = "mark is required!";
    } else if (values["Mark 3"] > 100) {
      errors["Mark 3"] = "Please Enter valid mark";
    }

    if (values["Mark 4"] === "") {
      errors["Mark 4"] = "mark is required!";
    } else if (values["Mark 4"] > 100) {
      errors["Mark 4"] = "Please Enter valid mark";
    }

    if (values["Mark 5"] === "") {
      errors["Mark 5"] = "mark is required!";
    } else if (values["Mark 5"] > 100) {
      errors["Mark 5"] = "Please Enter valid mark";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && allSuccess) {
      if (type === "add") {
        addStudentData(formValues);
      } else {
        editStudentsData(formValues);
      }
    }
  }, [formErrors]);

  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [grade, setGrade] = useState("");

  useEffect(() => {
    const Total =
      Number(formValues["Mark 1"]) +
      Number(formValues["Mark 2"]) +
      Number(formValues["Mark 3"]) +
      Number(formValues["Mark 4"]) +
      Number(formValues["Mark 5"]);

    const Average = Total / 5;
    const Grade = getGrade(formValues, Average);

    console.log(allSuccess, "allSuccess solai");
    if (allSuccess) {
      console.log(total, "total");

      setTotal(Total);
      setAverage(Average);
      setGrade(Grade);
    }
    setFormValues(formValue);
  }, [formValue, allSuccess, formErrors]);

  const dispatch = useDispatch();
  console.log(grade, "grade");
  const getGrade = (data, Average) => {
    let gradeValue;
    if (
      data["Mark 1"] < 35 ||
      data["Mark 2"] < 35 ||
      data["Mark 3"] < 35 ||
      data["Mark 4"] < 35 ||
      data["Mark 5"] < 35
    ) {
      gradeValue = "Fair & Fail";
    } else if (Average >= 95) {
      gradeValue = "Excellent";
    } else if (Average < 95 && Average >= 85) {
      gradeValue = "Very Good";
    } else if (Average < 85 && Average >= 65) {
      gradeValue = "Good";
    } else if (Average < 65 && Average >= 35) {
      gradeValue = "Ok";
    } else {
      gradeValue = "Fair & Fail";
    }

    return gradeValue;
  };

  // const navigate = redirect();

  const addStudentData = (data) => {
    const Total =
      Number(formValues["Mark 1"]) +
      Number(formValues["Mark 2"]) +
      Number(formValues["Mark 3"]) +
      Number(formValues["Mark 4"]) +
      Number(formValues["Mark 5"]);

    const Average = Total / 5;
    const Grade = getGrade(formValues, Average);
    const postData = {
      name: data.Name,
      phone: data["Phone Number"],
      email: data.Email,
      tamil: data["Mark 1"],
      english: data["Mark 2"],
      maths: data["Mark 3"],
      science: data["Mark 4"],
      social_science: data["Mark 5"],
      total: Total,
      average: Average,
      grade: Grade,
      comments: data.Comments,
      gender: data.Gender,
      standard: data.Standard,
    };

    const postValues = JSON.stringify(postData);
    const method = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: postValues,
    };

    dispatch(addStudent(method));

    setTimeout(() => {
      setFormValues(formValue);
      setTotal(0);
      setAverage(0);
      setGrade("");
    }, 2000);
  };

  const router = useRouter();
  const editStudentsData = (data) => {
    const Total =
      Number(formValues["Mark 1"]) +
      Number(formValues["Mark 2"]) +
      Number(formValues["Mark 3"]) +
      Number(formValues["Mark 4"]) +
      Number(formValues["Mark 5"]);
    const Average = Total / 5;
    const updateData = {
      name: data.Name,
      phone: data["Phone Number"],
      email: data.Email,
      tamil: data["Mark 1"],
      english: data["Mark 2"],
      maths: data["Mark 3"],
      science: data["Mark 4"],
      social_science: data["Mark 5"],
      total: Total,

      average: Average,
      grade: getGrade(formValues, Average),
      comments: data.Comments,
      gender: data.Gender,
      standard: data.Standard,
    };

    const postValues = JSON.stringify(updateData);

    const method = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: postValues,
    };

    dispatch(editStudent({ id, method }));

    setTimeout(() => {
      router.push("/listall");
    }, 2000);
  };

  return (
    <>
      <div className={"commonForm"}>
        <form onSubmit={handleSubmit} ref={form}>
          <div className={"head"}>
            <h2>{type === "add" ? "Add" : "Update"}</h2>
          </div>
          <div className={"body"}>
            <div className={"left"}>
              {inputs &&
                inputs.map((data, i) => {
                  if (data.type === "select") {
                    return (
                      <div className={"input"} key={data.text}>
                        <label>
                          <span>{data.text}</span>
                          <DropDown
                            options={data.options}
                            name={data.text}
                            call={handleFormValues}
                            selected={formValues[data.text]}
                          />
                        </label>
                        <small>{formErrors[data.text]}</small>
                      </div>
                    );
                  } else {
                    if (data.type === "textarea") {
                      return (
                        <div className={"input"} key={data.text}>
                          <label>
                            <span>{data.text}</span>
                            <textarea
                              value={formValues[data.text] || ""}
                              name={data.text}
                              onChange={handleFormValues}
                            ></textarea>
                          </label>
                        </div>
                      );
                    } else {
                      return (
                        <div className={"input"} key={data.text}>
                          <label>
                            <span>{data.text}</span>
                            <input
                              type={data.type}
                              name={data.text}
                              value={formValues[data.text]}
                              onChange={handleFormValues}
                            />
                          </label>
                          <small>{formErrors[data.text]}</small>
                        </div>
                      );
                    }
                  }
                })}

              <div className={"actionBtns"}>
                <Button type="submit">
                  {type == "add" ? "Submit" : "Update"}
                </Button>
                <Button>Cancel</Button>
              </div>
            </div>
            <div className={"right"}>
              <div className={"detail"}>
                <p>Total</p>
                {total ? <span>{total}</span> : <span>EX:280</span>}
              </div>
              <div className={"detail"}>
                <p>Average</p>
                {average ? <span>{average}%</span> : <span>EX:90%</span>}
              </div>
              <div className={"detail"}>
                <p>Grade</p>
                {grade ? <span>{grade}</span> : <span>EX:Good</span>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommonForm;
