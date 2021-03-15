import {
  DataType,
  ExpenditureType,
  GroupType,
  OptionType,
  PeopleType,
  YearType
} from "./types";
import cost from "./cost-of-living";
import statistic from "./Household-living-costs.json";

export const years = [2008, 2011, 2014, 2017, 2018, 2020];
export const people = [
  "All households",
  "Beneficiary",
  "Expenditure quintile 1 (low)",
  "Expenditure quintile 2",
  "Expenditure quintile 3",
  "Expenditure quintile 4",
  "Expenditure quintile 5 (high)",
  "Income quintile 1 (low)",
  "Income quintile 2",
  "Income quintile 3",
  "Income quintile 4",
  "Income quintile 5 (high)",
  "Maori",
  "Superannuitant"
];

export const options: OptionType[] = years.map((year) => ({
  label: year.toString(),
  value: year.toString()
}));

export const peopleOptions: OptionType[] = people.map((p) => ({
  label: p,
  value: p
}));

export const groups = cost.children[0].children[0].children;

// Take into selected data and change it to the format Barchart requires
export const dataGenerator = (data: DataType) => {
  let finalData = { name: "cost", children: [] } as ExpenditureType;
  let selectedPeople = [] as PeopleType[];
  let selectedYears = [] as YearType[];
  let selectedGroups = [] as GroupType[];

  // Convert option type to year type
  data.selectedYears.forEach((element) => {
    selectedYears.push({ name: parseInt(element.value), children: [] });
  });
  // Convert people option type to year type
  data.selectedPeople.forEach((i) => {
    selectedPeople.push({ name: i.value, children: [] });
  });
  // Convert item to group type
  data.selectedGroups.forEach((g) => {
    selectedGroups.push({ name: g.name, children: [] });
    g.children.forEach((s) => {
      selectedGroups.forEach((element) => {
        if (element.name === g.name) {
          element.children.push({ name: s.name, value: 0 });
        }
      });
    });
  });

  // If user does not select any year, choose all by default
  if (!data.selectedYears.length) {
    years.forEach((i) => {
      selectedYears.push({ name: i, children: [] });
    });
  }

  // If not people group chosen, show all by default
  if (!data.selectedPeople.length) {
    people.forEach((i) => {
      selectedPeople.push({ name: i, children: [] });
    });
  }

  if (!data.selectedGroups.length) {
    selectedGroups = groups;
  }

  // Add groups to each people group
  // Deep copy
  selectedPeople.forEach((p) => {
    p.children = JSON.parse(JSON.stringify(selectedGroups));
  });

  //Add people to each year
  selectedYears.forEach((y) => {
    y.children = JSON.parse(JSON.stringify(selectedPeople));
  });

  // Add years to final data
  finalData.children = JSON.parse(JSON.stringify(selectedYears));

  // Add value to each subgroup
  statistic.forEach((item) => {
    finalData.children.forEach((year) => {
      if (item.year === year.name) {
        year.children.forEach((people) => {
          if (item.hlpi_name === people.name) {
            people.children.forEach((group) => {
              if (item.nzhec1_short === group.name) {
                group.children.forEach((subgroup) => {
                  if (item.nzhec_short === subgroup.name) {
                    subgroup.value = item.exp_pw;
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  return finalData;
};
