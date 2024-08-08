export const tableTitles = [
  {
    text: "Reg. No",
    sortTerm: "_id",
  },
  {
    text: "Name",
    sortTerm: "name",
  },
  {
    text: "Email",
    sortTerm: "email",
  },
  {
    text: "Phone Number",
    sortTerm: "phone",
  },
  {
    text: "Gender",
    sortTerm: "gender",
  },
  {
    text: "Standard",
    sortTerm: "standard",
  },
  {
    text: "Tamil",
    sortTerm: "tamil",
  },
  {
    text: "English",
    sortTerm: "english",
  },
  {
    text: "Maths",
    sortTerm: "maths",
  },
  {
    text: "Science",
    sortTerm: "science",
  },
  {
    text: "Social Science",
    sortTerm: "social_science",
  },
  {
    text: "Total",
    sortTerm: "total",
  },
  {
    text: "Average",
    sortTerm: "average",
  },
  {
    text: "Grade",
    sortTerm: "grade",
  },
];

export const inputs = [
  {
    text: "Name",
    type: "text",
  },
  {
    text: "Email",
    type: "email",
  },
  {
    text: "Phone Number",
    type: "number",
  },

  {
    text: "Gender",
    type: "select",
    options: ["Male", "Female"],
  },
  {
    text: "Standard",
    type: "select",
    options: [...Array(10)].map((_, i) => i + 1),
  },
  {
    text: "Mark 1",
    type: "number",
  },
  {
    text: "Mark 2",
    type: "number",
  },
  {
    text: "Mark 3",
    type: "number",
  },
  {
    text: "Mark 4",
    type: "number",
  },
  {
    text: "Mark 5",
    type: "number",
  },
  {
    text: "Comments",
    type: "textarea",
  },
];
