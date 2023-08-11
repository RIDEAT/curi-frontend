const loadWorkflowData = async () => {
  const workflowList = require("../../public/workflow/info.json");
  const workflowData = [];

  workflowList["workflow-list"].forEach((workflow, index1) => {
    workflowData.push({});
    const workflowInfo = require(`../../public/workflow/${workflow}/info.json`);
    workflowData[index1]["id"] = workflowInfo["id"];
    workflowData[index1]["type"] = workflowInfo["type"];
    workflowData[index1]["title"] = workflowInfo["title"];
    workflowData[index1]["desc"] = workflowInfo["desc"];
    workflowData[index1]["sequences"] = [];
    workflowInfo["sequences"].forEach((sequence, index2) => {
      const sequenceInfo = require(`../../public/workflow/${workflow}/${sequence}/info.json`);
      workflowData[index1]["sequences"].push({});
      workflowData[index1]["sequences"][index2]["id"] = sequenceInfo["id"];
      workflowData[index1]["sequences"][index2]["title"] =
        sequenceInfo["title"];
      workflowData[index1]["sequences"][index2]["type"] = sequenceInfo["type"];
      workflowData[index1]["sequences"][index2]["day-offset"] =
        sequenceInfo["day-offset"];
      workflowData[index1]["sequences"][index2]["role"] = sequenceInfo["role"];
      workflowData[index1]["sequences"][index2]["modules"] = [];

      [...sequenceInfo["modules"]].forEach((module, index3) => {
        const moduleFileName = module.split(".")[0];
        const moduleInfo = require(`../../public/workflow/${workflow}/${sequence}/${moduleFileName}.json`);
        workflowData[index1]["sequences"][index2]["modules"][index3] =
          moduleInfo;
      });
    });
    workflowData[index1]["sequences"].sort((a, b) => {
      return a["day-offset"] - b["day-offset"];
    });
    workflowData[index1]["timeline"] = [];

    let timeline = {
      left: {},
      right: {},
      "day-offset": 0,
    };

    for (let i = 0; i < workflowData[index1]["sequences"].length; i++) {
      const sequence = workflowData[index1]["sequences"][i];
      if (i == 0) {
        timeline["day-offset"] = sequence["day-offset"];
        if (sequence["role"] == "employee") {
          timeline["left"] = sequence;
        } else {
          timeline["right"] = sequence;
        }
      } else {
        if (sequence["day-offset"] != timeline["day-offset"]) {
          workflowData[index1]["timeline"].push(timeline);
          timeline = {
            left: (sequence["role"] == "employee" && sequence) || {},
            right: (sequence["role"] != "employee" && sequence) || {},
            "day-offset": sequence["day-offset"],
          };
        } else {
          if (sequence["role"] == "employee") {
            timeline["left"] = sequence;
          } else {
            timeline["right"] = sequence;
          }
        }
      }
    }

    if (timeline.left || timeline.right)
      workflowData[index1]["timeline"].push(timeline);
  });

  console.log(workflowData);

  return workflowData;
};

export { loadWorkflowData };
