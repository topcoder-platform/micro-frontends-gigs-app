/**
 * Controller for JobApplication endpoints
 */
const _ = require("lodash");
const service = require("../services/JobApplicationService");
const helper = require("../common/helper");

/**
 * Get current user's job applications
 * @param req the request
 * @param res the response
 */
async function getMyJobApplications(req, res) {
  const result = await service.getMyJobApplications(req.authUser, req.query);
  helper.setResHeaders(req, res, result);
  res.send(result.result);
}

async function getJob(req, res) {
  const result = await service.getJob(req.authUser, req.query);
  res.send(result);
}

async function getJobs(req, res) {
  const query = { ...req.query, bodySkills: _.get(req, "body.bodySkills", []) };
  const result = await service.getJobs(query);
  res.send(result);
}

module.exports = {
  getMyJobApplications,
  getJob,
  getJobs,
};
