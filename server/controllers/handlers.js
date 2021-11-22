const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const QueryFeatures = require("./../utils/queryFeatures");

// delete object of given Model assigned to req.params.id
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }

    res.status(204).json({
      status: "success",
      data: {
        data: "Remove successfully",
      },
    });
  });

// update object of given Model assigned to req.params.id with req.body data
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }

    return res.status(200).json({ status: "success", data: doc });
  });

// create object of given Model with req.body data
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({ status: "success", data: { data: doc } });
  });

// get object of given Model assigned to req.params.id
// popObjects - contains paths for fields to populate
exports.getOne = (Model, ...popObjects) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    let doc;
    if (popObjects.length > 0) {
      for (const popObject of popObjects) {
        query.populate(popObject);
      }
      doc = await query.select("-__v");
    } else doc = await query.select("-__v");
    if (!doc) {
      return next(new AppError("No document found with that id", 404));
    }

    return res.status(200).json({ status: "success", data: doc });
  });

// get all objects of given Model
exports.getAll = (Model, findObject = {}, findNeedReq = false, ...popObjects) =>
  catchAsync(async (req, res, next) => {
    let findData = findObject;
    if (findNeedReq) {
      findData = findObject(req);
    }
    const features = new QueryFeatures(Model.find(findData), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    let docs;
    if (popObjects.length > 0) {
      for (const popObject of popObjects) {
        features.query.populate(popObject);
      }
      docs = await features.query;
    } else docs = await features.query;
    return res.status(200).json({ status: "success", data: docs });
  });
