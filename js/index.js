let ppdata = [];
let editId = '';
let imageData = ''
window.addEventListener("load", () => {
    let tdata = JSON.parse(localStorage.getItem("ppdata"));
    if (tdata?.length) {
        ppdata = [...tdata];
        localStorageData();
        table();
    }
})

const handleSubmit = () => {
    let HobbyData = [];
    if (formValidation()) {
        let fname = document.querySelector("#inputname").value;
        let email = document.querySelector("#inputEmail").value
        let password = document.querySelector("#inputPassword").value
        let address = document.querySelector("#inputAddress").value
        let city = document.querySelector("#inputCity").value
        let state = document.querySelector("#inputState").value
        let gender = document.querySelector("input[type=radio]:checked").value;
        let hobby = document.querySelectorAll("input[type=checkbox]:checked")
        hobby.forEach(x => HobbyData.push(x.value));
        let id = editId ? editId : Math.floor(Math.random() * 100000000);
        let data = { id, fname, email, password, address, city, state, gender, hobby: HobbyData, image: imageData }
        console.log(data);
        if (editId) {
            let index = ppdata.findIndex(x => x.id === editId);
            ppdata.splice(index, 1, data);

        }
        else {
            ppdata.push(data)
        }

        localStorageData();
        table();
        var modal = document.getElementById("exampleModal");
        modal.classList.remove();
        modal.style.display = "none";
        var modalback = document.getElementsByClassName("modal-backdrop")[0];
        if (modalback) {
            modalback.parentNode.removeChild(modalback);
        }
    }
}
const localStorageData = () => {
    localStorage.setItem("ppdata", JSON.stringify(ppdata));
}
const table = () => {
    document.getElementById("tbody").innerHTML = ppdata.map((data, index) => {
        return `<tr>
        <td>${data.id}</td>
        <td><img src="${data.image}" alt="" height="100px" width="100px"></td>
        <td>${data.fname}</td>
        <td>${data.email}</td>
        <td>${data.password}</td>
        <td>${data.address}</td>
        <td>${data.city}</td>
        <td>${data.state}</td>
        <td>${data.gender}</td>
        <td>${data.hobby}</td>
        <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateData(${index})">update</button>
        <button type="button" class="btn btn-danger"  onclick="deleteData(${index})">delete</button>
        </td>
        </tr>`;
    })
}
const deleteData = (index) => {
    if (confirm("are you sure this data is deleted")) {

        ppdata.splice(index, 1);
        localStorageData()
        table();
    }
}
const updateData = (index) => {
    document.querySelector("#inputname").value = ppdata[index].fname;
    document.querySelector("#inputEmail").value = ppdata[index].email;
    document.querySelector("#inputPassword").value = ppdata[index].password;
    document.querySelector("#inputAddress").value = ppdata[index].address;
    document.querySelector("#inputCity").value = ppdata[index].city;
    document.querySelector("#inputState").value = ppdata[index].state;
    document.querySelector(`input[type=radio][value=${ppdata[index].gender}]`).checked = true;
    document.querySelectorAll("input[type=checkbox]").forEach(x => { x.checked = ppdata[index].hobby.includes(x.value) });
    editId = ppdata[index].id;
    document.getElementById("image").src = ppdata[index].image;
    imageData = ppdata[index].image;
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result);
        imageData = reader.result;
        document.getElementById("image").setAttribute("src", reader.result);

    }
    reader.readAsDataURL(file);
}

const formRestData = () => {
    document.getElementById("form").reset();
    editId = "";
    imageData = ""
    document.getElementById("image").setAttribute("src", '');
}

const formValidation = () => {
    isvalid = true;
    let fname = document.querySelector("#inputname").value;
    let email = document.querySelector("#inputEmail").value
    let password = document.querySelector("#inputPassword").value
    let address = document.querySelector("#inputAddress").value
    let city = document.querySelector("#inputCity").value
    let state = document.querySelector("#inputState").value
    let gender = document.getElementsByName("gender");
    let hobby = document.querySelectorAll("input[type=checkbox]:checked")

    let efname = document.getElementById("efname");
    let eemail = document.getElementById("eemail");
    let epassword = document.getElementById("epassword");
    let eaddress = document.getElementById("eaddress");
    let ecity = document.getElementById("ecity");
    let estate = document.getElementById("estate");
    let egender = document.getElementById("egender");
    let ehobby = document.getElementById("ehobby");
    let eimg = document.getElementById("eimg");




    if (fname === "") {
        efname.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        efname.innerHTML = ""
    }
    if (email === "") {
        eemail.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        eemail.innerHTML = ""
    }
    if (password === "") {
        epassword.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        epassword.innerHTML = ""
    }
    if (address === "") {
        eaddress.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        eaddress.innerHTML = ""
    }
    if (city === "") {
        ecity.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        ecity.innerHTML = ""
    }
    if (state === "") {
        estate.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        estate.innerHTML = ""
    }
    if (!(gender[0].checked || gender[1].checked || gender[2].checked)) {
        egender.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        egender.innerHTML = ""
    }
    if (hobby.length === 0) {
        ehobby.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        ehobby.innerHTML = ""
    }
    if (imageData.length === 0) {
        eimg.innerHTML = "please enter a name";
        isvalid = false;
    } else {
        eimg.innerHTML = ""
    }
    return isvalid;
}