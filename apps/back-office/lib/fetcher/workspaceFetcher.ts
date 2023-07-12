const WorkspaceFetcher = {
  update: async (workspaceId, data) => {
    const response = await fetch(`/api/workspace/${workspaceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
};

export default WorkspaceFetcher;
