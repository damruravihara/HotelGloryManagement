import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rooms.css";
import swal from "sweetalert";
import jspdf from "jspdf";
import "jspdf-autotable";

import { Link, useHistory } from "react-router-dom";
// import { Input } from "antd";

export default function Rooms() {
  const [data, setData] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let path = "/user/profile";
  const [searchTerm, setsearchTerm] = useState("");

  //retriew

  useEffect(() => {
    const getRoom = async () => {
      const res = await axios
        .get("/rooms/roomsview")
        .then((res) => {
          setRoomList(res.data);
        })
        .catch(() => {});
    };
    getRoom();
  }, []);

  // Delete Method

  const deleteRoom = (id) => {
    swal({
      title: "Are you sure?",
      text: "Room Will be permenatly remove from System",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/rooms/delete/${id}`).then(() => {
          if (willDelete) {
            swal("The Room has been deleted!", { icon: "success" });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            swal("Room Is Not Deleted");
          }
        });
      }
    });
  };

  return (
    <>
      {/* Search Bar */}
      <div className="room-search">
        <div class="container-fluid">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setsearchTerm(e.target.value);
              }}
            />
            <button class="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Buttons for Add Room & Report */}
      <div className="btnAddRoomandReport">
        <Link to="/addrooms">
          <button type="button" class="btn btn-primary btn-sm">
            ADD A NEW ROOM
          </button>
        </Link>
        &nbsp;
        <Link to="#">
          <button type="button" class="btn btn-primary btn-sm">
            GENERATE REPORT
          </button>
        </Link>
      </div>

      {/* Card view */}
      <div className="staffcard">
        <div className="container" id="cardviewforstaff">
          <div class="card mb-3">
            {roomList
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.RoomType.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  ) ||
                  val.Price.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((rooms) => (
                <div
                  class="row
                
                  "
                >
                  <div class="col-md-10">
                    <div class="card-body">
                      <div key={rooms._Id}>
                        <h5 class="card-title">{rooms.RoomType}</h5>
                        <p class="card-text">{rooms.description}</p>
                        <p class="card-text">
                          <small class="text-muted">
                            Price :- LKR.{rooms.Price}/= (Per Night)
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="" id="roommanagementbutton">
                      <center>
                        <Link to={"/updateroom/" + rooms._id}>
                          <button type="button" class="btn btn-success">
                            UPDATE
                          </button>
                        </Link>
                        <br />
                        <br />
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => deleteRoom(rooms._id)}
                        >
                          DELETE
                        </button>
                      </center>
                    </div>
                  </div>
                  <br />
                  <br />
                  <hr style={{ height: 10 + "px" }}></hr>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
