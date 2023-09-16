const Connection = require("./connection.js");
const helper = require("../components/helper");

const create = async (data) => {
  const collection = Connection.conn.collection("sites");
  let siteName = data.site_name;
  let positions = data.position;

  try {
    let validateResponse = await collection
      .find({ site_name: siteName })
      .toArray();
    // console.log("validateResponse");
    // console.log(validateResponse.len);
    // process.exit(0);
    if (validateResponse.length > 0) {
      return {
        success: false,
        message: "site is alreadt created for this name ",
      };
    }
    console.log(validateResponse);
    let UUID = helper.createUUID(15);
    console.log(UUID);

    const dbResponse = await collection.insertOne({
      site_id: UUID,
      site_name: siteName,
      positions: positions,
    });
    // console.log(dbResponse);
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your site created successfully and your site id is ${UUID}`,
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
const update = async (data, siteId) => {
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
    }
    const dbResponse = await collection.updateOne(
      {
        site_id: siteId,
      },
      { $set: data }
    );
    console.log(dbResponse);
    // if (dbResponse.acknowledged && dbResponse.modifiedCount > 0) {
      return {
        success: true,
        data: `your site was updated successfully `,
      };
    // } else {
    //   return {
    //     success: false,
    //     message: `somthing went wrong please try again later`,
    //   };
    // }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
const deleteSite = async (siteId) => {
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
    }

    const dbResponse = await collection.deleteOne({
      site_id: siteId,
    });
    // console.log(dbResponse);
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your site deleted successfully `,
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
const deleteDroneFromSite = async (siteId) => {
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
    }

    const dbResponse = await collection.updateOne(
      { site_id: siteId },
      { $unset: { drone: 1 } }
    );
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your drone was removed successfully from site.`,
      };
    } else {
      return {
        success: false,
        message: `somthing went wrong please try again later.`,
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
  deleteSite,
  deleteDroneFromSite,
};
