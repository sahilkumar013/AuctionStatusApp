console.log("Helloworld");
var arr = [];

async function getDataFromAPI() {
  document.getElementById("loader").style.display = "block";
  console.log("Fetching Data...");

  try {
    const response = await fetch(
      "https://gauravgitacc.github.io/postAppData/auctionData.json"
    );
    arr = await response.json();
    sessionStorage.setItem("myArr", JSON.stringify(arr));
    // alert("Added to Session Storage");
    if (arr) {
      console.log("data", arr);
      showData(arr);

      document.getElementById("loader").style.display = "none";
    }
  } catch (e) {
    console.log("Error--", e);
  }
}

if (sessionStorage.getItem("myArr")) {
  // user is coming again in the session
  //   alert("Getting from Session Storage");
  var myArr = JSON.parse(sessionStorage.getItem("myArr"));
  showData(myArr);
  arr = myArr;
} else {
  // user is coming to the session for the very first time
  getDataFromAPI();
}

document.getElementById("search").addEventListener("input", () => {
  var newArr = arr.filter((item) =>
    item.toLocation
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  showData(newArr);
});

function showData(myArr) {
  document.getElementById("container").innerHTML = "";
  let innerHtml = "";
  myArr.forEach((item) => {
    innerHtml += `
                <div class='myDiv'>
                    <div class='flex-info'>
                        <div>
                            <div class='chip ${
                              item.status == "PENDING"
                                ? "yellow"
                                : item.status == "CANCELLED"
                                ? "red"
                                : ""
                            }' >${item.status}</div>
                            <p>${item.caseNumber}</p>
                        </div>
                        <p>${item.date}</p>
                    </div>
                    <hr/>
                    <div>
                            <strong>${item.toLocation}</strong>
                            <p>${
                              item.fromLocation
                            } <span style='float:right;'>${item.fare}</span></p>
                    </div>
                </div>
                `;
  });
  document.getElementById("container").innerHTML = innerHtml;
}