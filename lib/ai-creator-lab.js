export const groupGenerationsByType = (generations = []) => {
  const grouped = {
    video: [],
    image: [],
    script: [],
  };

  generations.forEach((item) => {
    const type = (item?.task_type || "").toLowerCase();
    if (type === "image") {
      grouped.image.push(item);
    } else if (type === "script") {
      grouped.script.push(item);
    } else {
      grouped.video.push(item);
    }
  });

  return grouped;
};

export const mergeGenerationLists = (primary = [], secondary = []) => {
  const seen = new Set(primary.map((item) => item?.id ?? item));
  const merged = [...primary];

  secondary.forEach((item) => {
    const id = item?.id ?? item;
    if (!seen.has(id)) {
      merged.push(item);
      seen.add(id);
    }
  });

  return merged;
};
