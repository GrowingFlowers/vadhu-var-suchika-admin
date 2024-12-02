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
              talukas: [
                {
                  name: "Nashik",
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
}
