const Rid = require("../models/rid");
const csvToJson = require("csvtojson");
const path = require("path");

exports.getAll = async (req, res) => {
  const rids = await Rid.find();
  res.json(rids);
};

exports.getById = async (req, res) => {
  const rid = await Rid.findById(req.params.id);
  res.json(rid);
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
  if (rid) return res.status(401).json({ m: "Requisition ID already exist!" });
  const newRid = new Rid(req.body);
  await newRid.save();
  res.json(newRid);
};

exports.update = async (req, res) => {
  await Rid.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Rid updated" });
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
  await Rid.findByIdAndDelete(req.params.id);
  res.json({ message: "Rid deleted" });
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
