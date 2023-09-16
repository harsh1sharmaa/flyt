const Connection = require("./connection.js");
const helper = require("../components/helper.js");

const create = async (data) => {
  const collection = Connection.conn.collection("missions");
  let missionName = data.mission_name;
  let alt = data.alt;
  let speed = data.speed;

  try {
    let validateResponse = await collection
      .find({ mission_name: missionName })
      .toArray();
    if (validateResponse.length > 0) {
      return {
        success: false,
        message: "mission is alreadt created for this name ",
      };
    }
    console.log(validateResponse);
    let UUID = helper.createUUID(15);
    console.log(UUID);
    const created_at = new Date().toISOString();
    const dbResponse = await collection.insertOne({
      mission_id: UUID,
      mission_name: missionName,
      alt: alt,
      speed: speed,
      waypoints: [],
      created_at: { $date: created_at },
      updated_at: { $date: created_at },
    });
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your mission created successfully and your mission id is ${UUID}`,
      };
    } else {
      return {
        success: false,
        message: `somthing went wrong please try again later`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
const update = async (updatedData, missionId) => {
  const collection = Connection.conn.collection("missions");
  try {
    let validateResponse = await collection
      .find({ mission_id: missionId })
      .toArray();
    if (validateResponse.length == 0) {
      return {
        success: false,
        message: "invalid mission_id please provide a valid mission_id",
      };
    }
    const dbResponse = await collection.updateOne(
      {
        mission_id: missionId,
      },
      { $set: updatedData }
    );
    console.log(dbResponse);
    if (dbResponse.acknowledged && dbResponse.modifiedCount > 0) {
      return {
        success: true,
        data: `your mission name was updated successfully `,
      };
    } else {
      return {
        success: false,
        message: `somthing went wrong please try again later`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
const deleteMission = async (missionId) => {
  const collection = Connection.conn.collection("missions");

  try {
    let validateResponse = await collection
      .find({ mission_id: missionId })
      .toArray();
    //   console.log(validateResponse);
    //   process.exit(0);
    // console.log("validateResponse");
    // console.log(validateResponse.len);
    // process.exit(0);
    if (validateResponse.length == 0) {
      return {
        success: false,
        message: "invalid mission_id please provide a valid mission_id",
      };
    }

    const dbResponse = await collection.deleteOne({
      mission_id: missionId,
    });
    // console.log(dbResponse);
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your mission deleted successfully `,
      };
    } else {
      return {
        success: false,
        message: `somthing went wrong please try again later`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

const checkSitePresentOrNot = async (siteId) => {
  const collection = Connection.conn.collection("sites");
  try {
    let validateResponse = await collection.find({ site_id: siteId }).toArray();
    //   console.log(validateResponse);
    //   process.exit(0);
    // console.log("validateResponse");
    // console.log(validateResponse.len);
    // process.exit(0);
    if (validateResponse.length == 0) {
      return {
        success: false,
        message: "invalid site_id please provide a valid site_id",
      };
    } else {
      return {
        success: true,
        message: `site is present of this ${siteId}`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
module.exports = {
  create,
  update,
  deleteMission,
  checkSitePresentOrNot,
};
