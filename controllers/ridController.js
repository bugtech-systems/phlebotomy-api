const ObjectId = require('mongodb').ObjectId;
const Rid = require("../models/rid");
const csvToJson = require("csvtojson");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    const rids = await Rid.find(req.query).limit(500);
    return res.json(rids);
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Something went wrong!', error: err })
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  console.log('GET BY ID', id)

  try {
    if (ObjectId.isValid(id) && !Number(id)) {
      const rid = await Rid.findById(id);
      if (!rid) return res.status(404).json({ m: "Requisition not found." });
      return res.json(rid);
    } else {
      const rid = await Rid.findOne({ rid: Number(id) });
      if (!rid) return res.status(404).json({ m: "Requisition not found." });
      return res.json(rid);
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Something went wrong!' })
  }

};

exports.getByRid = async (req, res) => {
  let { id } = req.params;
  const requisition = await Rid.findOne({ rid: id });

  if (!requisition)
    return res.status(404).json({ m: "Requisition not found." });

  const {
    rid,
    _id,
    destination_status,
    unsuccessful_reason,
    dispatch_history: { collection_date, panels, samples, site, patient },
  } = requisition;
  let newObj = {
    _id,
    rid,
    destination_status,
    unsuccessful_reason,
    collection_date,
    panels,
    samples,
    site: site.name,
    client: site.client.name,
    first_name: patient.first_name,
    last_name: patient.last_name,
    date_of_birth: patient.date_of_birth,
  };

  res.status(200).json(newObj);
};

exports.bulkCreate = async (req, res) => {
  const data = req.body;

  let newData = await Promise.all(
    data.map(async (item) => {
      let rid = await Rid.findOne({ rid: item.rid });
      if (rid) return null;

      let newObj = {
        ...item,
        dispatch_date: item.dispatch_history.scheduled_date,
      };
      const newRid = new Rid(newObj);
      await newRid.save();
      return newRid;
    })
  );
  let finalData = newData.filter((a) => {
    return a !== null;
  });
  res.json(finalData);
};

exports.create = async (req, res) => {
  let rid = await Rid.findOne({ rid: req.body.rid });
  if (rid) return res.status(400).json({ message: 'Requisition with same id Already Exist!', data: rid });
  const newRid = new Rid(req.body);
  await newRid.save();
  return res.json(newRid);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    let options = ObjectId.isValid(id) && !Number(id) ? { _id: id } : { rid: id };
    let order = await Rid.findOne(options);
    if (!order) return res.status(404).json({ message: 'Order not exist!' })

    let newObj = {};
    newObj = req.body;


    delete newObj.rid;
    delete newObj._id;

    let newOrder = await Rid.findByIdAndUpdate(order._id, newObj, { new: true })
    return res.status(200).json(newOrder);

    // if (ObjectId.isValid(id) && !Number(id)) {
    //   await Rid.findByIdAndUpdate(id, req.body);
    //   return res.json({ message: "Requisition updated" });
    // } else {
    //   await Rid.findOneAndUpdate({ rid: id }, req.body);
    //   return res.json({ message: "Requisition updated" });
    // }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Unable to update, Something went wrong!' })
  }


};

exports.updateByRid = async (req, res) => {
  await Rid.findOneAndUpdate({ rid: req.params.id }, req.body);
  res.json({ message: "Rid updated" });
};

exports.bulkDelete = async (req, res) => {
  let data = req.body;
  console.log(data);
  let newData = await Promise.all(
    data.map(async (id) => {
      let rid = await Rid.findOneAndDelete({ rid: id });
      return rid;
    })
  );

  res.json(newData);
};

exports.delete = async (req, res) => {
  const { id } = req.params;


  if (ObjectId.isValid(id) && !Number(id)) {
    const rid = await Rid.findByIdAndDelete(id);
    return res.json({ m: "Requisition deleted." });
  } else {
    const rid = await Rid.findOneAndDelete({ rid: Number(id) });
    return res.json({ m: "Requisition deleted." });
  }

};

exports.upload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  const dir = path.join(process.env.UPLOAD_PATH, "uploads") || "/uploads";
  let csvData = [];
  let csvPath = path.join(dir, req.file.filename);

  console.log(csvPath);

  const json = await csvToJson().fromFile(csvPath);

  console.log(json);

  for (let val of json) {
    console.log(val);
    await Rid.create(val)
      .then((doc) => {
        // console.log(doc)
        csvData.push(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.status(200).json({
    m: "CSV Data",
    d: csvData,
  });
};
