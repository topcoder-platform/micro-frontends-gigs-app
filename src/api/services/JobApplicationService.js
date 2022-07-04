/**
 * This service provides operations of JobApplications.
 */

const _ = require("lodash");
const Joi = require("joi");
const helper = require("../common/helper");
const errors = require("../common/errors");
const logger = require("../common/logger");

/**
 * Get Job Applications of current user
 * @param {Object} currentUser the user who perform this operation.
 * @param {Object} criteria the search criteria
 * @returns {Array<Object>} the JobApplications
 */
async function getMyJobApplications(currentUser, criteria) {
  const page = criteria.page;
  const perPage = criteria.perPage;
  const sortBy = criteria.sortBy;
  const sortOrder = criteria.sortOrder;
  const status = criteria.status || "";
  const emptyResult = {
    total: 0,
    page,
    perPage,
    result: [],
  };
  // we expect logged-in users
  if (currentUser.isMachine) {
    return emptyResult;
  }
  // get user id by calling taas-api with current user's token
  const { id: userId, handle: userHandle } = await helper.getCurrentUserDetails(
    currentUser.jwtToken
  );
  if (!userId || !userHandle) {
    throw new errors.NotFoundError(
      `Id for user: ${currentUser.userId} or handle for user: ${currentUser.handle} not found`
    );
  }
  // get jobCandidates of current user by calling taas-api
  const jobCandidates = await helper.getJobCandidates({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    status,
  });
  // if no candidates found then return empty result
  if (jobCandidates.result.length === 0) {
    return emptyResult;
  }
  let jcResult = jobCandidates.result;
  // handle placed status for completed_jobs, archived_jobs query
  if (status && (status == "active_jobs" || status == "completed_jobs")) {
    await helper.handlePlacedJobCandidates(
      jobCandidates.result,
      userId,
      userHandle
    );
    if (status == "completed_jobs") {
      jcResult = jobCandidates.result.filter(
        (item) => item.status == "completed"
      );
    }
    if (status == "active_jobs") {
      jcResult = jobCandidates.result.filter(
        (item) => item.status != "completed"
      );
    }
  }

  const jobIds = _.map(jcResult, "jobId");
  // get jobs of current user by calling taas-api
  const { result: jobs } = await helper.getJobs({ jobIds, page: 1, perPage });

  // apply desired structure
  const jobApplications = _.map(jcResult, (jobCandidate) => {
    const job = _.find(jobs, ["id", jobCandidate.jobId]);
    if (!job) return null;
    return {
      title: job.title,
      paymentTotal: jobCandidate.paymentTotal,
      rbStartDate: jobCandidate.rbStartDate,
      rbEndDate: jobCandidate.rbEndDate,
      updatedAt: jobCandidate.updatedAt,
      payment: {
        min: job.minSalary,
        max: job.maxSalary,
        frequency: job.rateType,
        // currency: job.currency,
        currency: "$",
      },
      hoursPerWeek: job.hoursPerWeek,
      location: job.jobLocation,
      workingHours: job.jobTimezone,
      status: jobCandidate.status,
      interview: !_.isEmpty(jobCandidate.interviews)
        ? _.maxBy(jobCandidate.interviews, "round")
        : null,
      remark: jobCandidate.remark,
      duration: job.duration,
      jobExternalId: job.externalId,
    };
  });
  return {
    total: jobCandidates.total,
    page: jobCandidates.page,
    perPage: jobCandidates.perPage,
    result: _.filter(jobApplications, (item) => item != null),
  };
}

getMyJobApplications.schema = Joi.object()
  .keys({
    currentUser: Joi.object().required(),
    criteria: Joi.object()
      .keys({
        page: Joi.page(),
        perPage: Joi.perPage(),
        sortBy: Joi.string().valid("id", "status").default("id"),
        sortOrder: Joi.string().valid("desc", "asc").default("desc"),
        status: Joi.string().valid(
          "active_jobs",
          "open_jobs",
          "completed_jobs",
          "archived_jobs"
        ),
      })
      .required(),
  })
  .required();

async function getJob(jwtToken = "", criteria) {
  // get user id by calling taas-api with current user's token
  let userId = "";
  if (jwtToken) {
    try {
      const res = await helper.getCurrentUserDetails(jwtToken);
      if (res) {
        userId = res.id;
      }
    } catch (err) {
      // capture the error but don't prevent the remain logic from continuing to execute
      logger.error("Error happened when retrieving user details ->", err);
    }
  }

  // get job based on the jobExternalId
  const { result: jobs } = await helper.getJobs(criteria);
  if (jobs && jobs.length) {
    const job = jobs[0];
    if (job.rcrmStatus != "Open" || !job.isApplicationPageActive) {
      return {
        jobClosed: true,
      };
    }
    const jobInfo = {
      id: job.id,
      title: job.title,
      payment: {
        min: job.minSalary,
        max: job.maxSalary,
        frequency: job.rateType,
        // currency: job.currency,
        currency: "$",
      },
      skills: job.skills,
      hoursPerWeek: job.hoursPerWeek,
      location: job.jobLocation,
      duration: job.duration,
      jobExternalId: job.externalId,
      jobTimezone: job.jobTimezone,
      description: job.description,
      synced: false,
    };
    if (userId) {
      const candidates = job.candidates || [];
      const candExists = candidates.find((item) => item.userId == userId);
      if (candExists) {
        jobInfo.synced = true;
      }
    }
    return jobInfo;
  }
  throw new errors.NotFoundError(
    `Job with externalId: ${criteria.externalId} not found`
  );
}

getJob.schema = Joi.object()
  .keys({
    jwtToken: Joi.string().allow("").allow(null).default(""),
    criteria: Joi.object()
      .keys({
        externalId: Joi.string().required(),
      })
      .required(),
  })
  .required();

async function getJobs(criteria = {}) {
  const page = criteria.page || 0;
  const perPage = criteria.perPage || 0;
  const emptyResult = {
    total: 0,
    page,
    perPage,
    result: [],
  };
  const jobsRes = await helper.getJobs(criteria);
  if (jobsRes.result.length === 0) {
    return emptyResult;
  }
  const jobs = jobsRes.result;
  // apply desired structure
  let res = _.map(jobs, (job) => {
    return {
      id: job.id,
      title: job.title,
      payment: {
        min: job.minSalary,
        max: job.maxSalary,
        frequency: job.rateType,
        // currency: job.currency,
        currency: "$",
      },
      skills: job.skills,
      location: job.jobLocation,
      duration: job.duration,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      featured: job.featured,
      showInHotList: job.showInHotList,
      hotListExcerpt: job.hotListExcerpt,
      jobTag: job.jobTag,
      jobExternalId: job.externalId,
      jobTimezone: job.jobTimezone,
      description: job.description,
      rcrmStatus: job.rcrmStatus,
      rcrmReason: job.rcrmReason,
    };
  });
  // Filter the special jobs
  if (criteria.specialJob === true) {
    let count = 0;
    const hotlistJobs = res.filter((item) => {
      if (count < 3 && item.showInHotList === true) {
        count++;
        return true;
      }
      return false;
    });
    const featuredJobs = res.filter((item) => {
      if (
        item.featured === true &&
        !hotlistJobs.find((hotJob) => hotJob.id === item.id)
      ) {
        return true;
      }
      return false;
    });
    res = [...hotlistJobs, ...featuredJobs];
  }
  if (criteria.specialJob === false) {
    res = res.filter((item) => !item.featured && !item.showInHotList);
  }
  return {
    total: jobsRes.total,
    page: jobsRes.page,
    perPage: jobsRes.perPage,
    result: res,
  };
}

getJobs.schema = Joi.object()
  .keys({
    criteria: Joi.object()
      .keys({
        page: Joi.page(),
        perPage: Joi.perPage(),
        sortBy: Joi.string()
          .valid("createdAt", "updatedAt")
          .default("createdAt"),
        sortOrder: Joi.string().valid("desc", "asc").default("desc"),
        jobLocation: Joi.string(),
        minSalary: Joi.number().integer(),
        maxSalary: Joi.number().integer(),
        title: Joi.string(),
        specialJob: Joi.boolean(),
        featured: Joi.boolean(),
        bodySkills: Joi.array().items(Joi.string().uuid()),
        isApplicationPageActive: Joi.boolean(),
        rcrmStatus: Joi.string().valid(
          "Open",
          "On Hold",
          "Canceled",
          "Draft",
          "Closed"
        ),
      })
      .required(),
  })
  .required();

module.exports = {
  getMyJobApplications,
  getJob,
  getJobs,
};
