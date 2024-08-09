import "@/app/styles/components/_form.scss";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DropDown from "../DropDown/DropDown";
import Button from "../Button/Button";
import { addStudent, editStudent } from "@/app/Redux/AddSlice";
import toast from "react-hot-toast";

const CommonForm = ({ type, inputs, formValue, id }) => {
  const [formValues, setFormValues] = useState(formValue);
  const [formErrors, setFormErrors] = useState({});
  const [allSuccess, setAllSuccess] = useState(false);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [grade, setGrade] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setAllSuccess(Object.keys(errors).length === 0);
  };
  const form = useRef("");

  const validate = (values) => {
    const errors = {};
    const isEmail = (value) => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);

    if (!values["Name"]) {
      errors.Name = "Name is required!";
    }

    if (!values.Email) {
      errors.Email = "Email is required!";
    } else if (!isEmail(values.Email)) {
      errors.Email = "Please enter a valid email format!";
    }

    if (!values["Phone Number"]) {
      errors["Phone Number"] = "Phone number is required!";
    } else if (values["Phone Number"].length !== 10) {
      errors["Phone Number"] = "Please enter a valid  number";
    }

    const validateMark = (mark, fieldName) => {
      if (!mark) {
        errors[fieldName] = `${fieldName} is required!`;
      } else if (mark > 100) {
        errors[fieldName] = `Please enter a valid mark for ${fieldName}`;
      }
    };

    validateMark(values["Mark 1"], "Mark 1");
    validateMark(values["Mark 2"], "Mark 2");
    validateMark(values["Mark 3"], "Mark 3");
    validateMark(values["Mark 4"], "Mark 4");
    validateMark(values["Mark 5"], "Mark 5");

    return errors;
  };

  useEffect(() => {
    if (allSuccess) {
      const Total =
        Number(formValues["Mark 1"]) +
        Number(formValues["Mark 2"]) +
        Number(formValues["Mark 3"]) +
        Number(formValues["Mark 4"]) +
        Number(formValues["Mark 5"]);

      const Average = Total / 5;
      const Grade = getGrade(formValues, Average);

      setTotal(Total);
      setAverage(Average);
      setGrade(Grade);

      if (type === "add") {
        addStudentData(formValues, Total, Average, Grade);
      } else {
        editStudentsData(formValues, Total, Average, Grade);
      }
    }
  }, [allSuccess]);

  useEffect(() => {
    setFormValues(formValue);
  }, [formValue]);

  const getGrade = (data, Average) => {
    if (
      data["Mark 1"] < 35 ||
      data["Mark 2"] < 35 ||
      data["Mark 3"] < 35 ||
      data["Mark 4"] < 35 ||
      data["Mark 5"] < 35
    ) {
      return "Fair & Fail";
    } else if (Average >= 95) {
      return "Excellent";
    } else if (Average < 95 && Average >= 85) {
      return "Very Good";
    } else if (Average < 85 && Average >= 65) {
      return "Good";
    } else if (Average < 65 && Average >= 35) {
      return "Ok";
    } else {
      return "Fair & Fail";
    }
  };

  const addStudentData = (data, Total, Average, Grade) => {
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

    dispatch(addStudent({ method: "POST", body: JSON.stringify(postData) }));

    toast.success("Student Added Successfully");

    setTimeout(() => {
      setFormValues(formValue);
      setTotal(0);
      setAverage(0);
      setGrade("");
      router.push("/listall");
    }, 2000);
  };

  const editStudentsData = (data, Total, Average, Grade) => {
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
      grade: Grade,
      comments: data.Comments,
      gender: data.Gender,
      standard: data.Standard,
    };
    const method = {
      method: "POST",
      body: JSON.stringify(updateData),
    };
    dispatch(editStudent({ id, method }));
    toast.success("Student Edited Successfully");
    setTimeout(() => {
      router.push("/listall");
    }, 2000);
  };

  return (
    <div className={"commonForm"}>
      <form onSubmit={handleSubmit} ref={form}>
        <div className={"head"}>
          <h2>{type === "add" ? "Add new Student" : "Update Student"}</h2>
        </div>
        <div className={"body"}>
          <div className={"left"}>
            {inputs &&
              inputs.map((data) => {
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
                } else if (data.type === "textarea") {
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
              })}
            <div className={"actionBtns"}>
              <Button type="submit">
                {type === "add" ? "Submit" : "Update"}
              </Button>
              <Button>Cancel</Button>
            </div>
          </div>
          <div className={"right"}>
            <div className={"detail"}>
              <p>Total</p>
              <span>{total || "EX:280"}</span>
            </div>
            <div className={"detail"}>
              <p>Average</p>
              <span>{average ? `${average}%` : "EX:90%"}</span>
            </div>
            <div className={"detail"}>
              <p>Grade</p>
              <span>{grade || "EX:Good"}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommonForm;
