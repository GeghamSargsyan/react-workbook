export const getCureentJob = (experience) => {
  const company = experience.filter((ex) => (
    !ex?.endDate && ex
  ));
  return company[0]?.companyName || 'not working';
};
