import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  getAllData() {
    return [
      {
        name: 'India', value: 'India',
        states: [
          {
            name: "Maharashtra", value: "Maharashtra",
            districts: [
              {
                name: "Nashik",
                value: 'Nashik',
                talukas: [
                  {
                    name: "Nashik",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Sinnar",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Igatpuri",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Dindori",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Trimbakeshwar",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Niphad",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Malegaon",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Chandwad",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Deola",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Baglan (Satana)",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Kalwan",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Peth",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  },
                  {
                    name: "Surgana",
                    value: 'Nashik',
                    dealers: [
                      {
                        name: 'Abhishek Joshi',
                        address: 'Pathardi Phata, Nashik',
                        mobileNumber: '7276414840'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  // Helper to fetch countries
  getAllCountries() {
    return this.getAllData().map((country) => ({
      name: country.name,
      value: country.value
    }));
  }

  // Helper to fetch states by country
  getStatesByCountry(countryValue: string) {
    const country = this.getAllData().find((c) => c.value === countryValue);
    return country ? country.states : [];
  }

  // Helper to fetch districts by state
  getDistrictsByState(stateValue: string) {
    const state = this.getAllData()
      .flatMap((c) => c.states)
      .find((s) => s.value === stateValue);
    return state ? state.districts : [];
  }

  // Helper to fetch talukas by district
  getTalukasByDistrict(districtName: string) {
    const district = this.getAllData()
      .flatMap((c) => c.states)
      .flatMap((s) => s.districts)
      .find((d) => d.name === districtName);
    return district ? district.talukas : [];
  }
}
