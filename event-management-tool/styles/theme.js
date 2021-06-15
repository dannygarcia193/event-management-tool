const num = {
    0:"0", 
    1:"0.25rem", 
    2:"0.5rem", 
    3:"1rem", 
    4:"1.25rem",
    5:"1.5rem",
    6:"2rem",
    7:"2.25rem",
    8:"2.5rem",
    9:"3rem",
    "auto":"auto"
}

export function theme() {
  return {
    space: 
      { 
      "m": val=> { return {"margin": `${num[val]} !important`}},
      "p": val=> { return {"padding": `${num[val]} !important`}},
      "mt":  val=> { return {"marginTop": `${num[val]} !important`}},
      "mb":  val=> { return {"marginBottom": `${num[val]} !important`}},
      "pt": val=> { return {"paddingTop": `${num[val]} !important`}},
      "pb": val=> { return {"paddingBottom": `${num[val]} !important`}},
      "ml": val=> { return {"marginLeft": `${num[val]} !important`}},
      "mr": val=> { return {"marginRight": `${num[val]} !important`}},
      "pl": val=> { return {"paddingLeft": `${num[val]} !important`}},
      "pr": val=> { return {"paddingRight": `${num[val]} !important`}},
      "mx": val=> { return {"marginLeft": `${num[val]} !important`,"marginRight": `${num[val]} !important`}},
      "my": val=> { return {"marginTop": `${num[val]} !important`, "marginBottom": `${num[val]} !important`}},
      "px": val=> { return {"paddingLeft": `${num[val]} !important`, "paddingRight": `${num[val]} !important`}},
      "py": val=> { return {"paddingTop": `${num[val]} !important`, "paddingBottom": `${num[val]} !important`}},
      },
    }
}

const Default = ''
export default Default