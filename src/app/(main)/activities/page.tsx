"use client";

import useActivities from "./hooks/use-activities";
import Loading from "@/app/loading";

const Page = () => {
  const { activitiesQuery } = useActivities();
  const activities = activitiesQuery.data || [];

  if (activitiesQuery.isPending) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Activities</h1>
      {activities.map((activity) => (
        <div key={activity.id}>
          <h2>{activity.name}</h2>
          <ul>
            {activity.scores.map((score) => (
              <li key={score.id}>{score.value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Page;
