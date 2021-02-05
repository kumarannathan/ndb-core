import { defaultAttendanceStatusTypes } from "./default-config/default-attendance-status-types";
import { defaultInteractionTypes } from "./default-config/default-interaction-types";

// prettier-ignore
export const defaultConfig = {
  "navigationMenu": {
    "items": [
      {
        "name": "Dashboard",
        "icon": "home",
        "link": "/"
      },
      {
        "name": "Children",
        "icon": "child",
        "link": "/child"
      },
      {
        "name": "Schools",
        "icon": "university",
        "link": "/school"
      },
      {
        "name": "Recurring Activities",
        "icon": "calendar",
        "link": "/recurring-activity"
      },
      {
        "name": "Record Attendance",
        "icon": "calendar-check-o",
        "link": "/attendance/add/day"
      },
      {
        "name": "Manage Attendance",
        "icon": "table",
        "link": "/attendance"
      },
      {
        "name": "Notes",
        "icon": "file-text",
        "link": "/note"
      },
      {
        "name": "Admin",
        "icon": "wrench",
        "link": "/admin"
      },
      {
        "name": "Users",
        "icon": "user",
        "link": "/users"
      },
      {
        "name": "Database Conflicts",
        "icon": "wrench",
        "link": "/admin/conflicts"
      },
      {
        "name": "Help",
        "icon": "question-circle",
        "link": "/help"
      }
    ]
  },


  "enum:interaction-type": defaultInteractionTypes,

  "enum:attendance-status": defaultAttendanceStatusTypes,


  "view:": {
    "component": "Dashboard",
    "config": {
      "widgets": [
        {
          "component": "ChildrenCountDashboard"
        },
        {
          "component": "RecentNotesDashboard"
        },
        {
          "component": "NoRecentNotesDashboard",
          "config": {
            "sinceDays": 28,
            "fromBeginningOfWeek": false
          }
        },
        {
          "component": "AttendanceWeekDashboard",
          "config": {
            "daysOffset": 0,
            "periodLabel": "last week"
          }
        },
        {
          "component": "AttendanceWeekDashboard",
          "config": {
            "daysOffset": 7,
            "periodLabel": "this week"
          }
        },
        {
          "component": "ProgressDashboard",
          "config": {
            "dashboardConfigId": "1"
          }
        }
      ]
    }
  },
  "view:user": {
    "component": "UserAccount"
  },
  "view:note": {
    "component": "NotesManager",
    "config": {
      "title": "Notes & Reports",
      "columns": [
        {
          "component": "DisplayDate",
          "title": "Date",
          "id": "date"
        },
        {
          "component": "DisplayText",
          "title": "Subject",
          "id": "subject"
        },
        {
          "component": "DisplayConfigurableEnum",
          "title": "Category",
          "id": "category"
        },
        {
          "component": "DisplayText",
          "title": "Author",
          "id": "author"
        },
        {
          "component": "ChildBlockList",
          "title": "Children",
          "id": "children",
          "noSorting": true
        }
      ],
      "columnGroup": {
        "default": "Standard",
        "mobile": "Mobile",
        "groups": [
          {
            "name": "Standard",
            "columns": [
              "date",
              "subject",
              "category",
              "author",
              "children"
            ]
          },
          {
            "name": "Mobile",
            "columns": [
              "date",
              "subject",
              "children"
            ]
          }
        ]
      },
      "filters": [
        {
          "id": "status",
          "type": "prebuilt"
        },
        {
          "id": "date",
          "type": "prebuilt"
        },
        {
          "id": "category",
          "label": "Category",
          "type": "configurable-enum",
          "enumId": "interaction-type",
          "display": "dropdown"
        }
      ]
    }
  },
  "view:admin": {
    "component": "Admin",
    "requiresAdmin": true
  },
  "view:users": {
    "component": "UserList",
    "requiresAdmin": true
  },
  "view:admin/conflicts": {
    "component": "ConflictResolution",
    "requiresAdmin": true,
    "lazyLoaded":  true
  },
  "view:help": {
    "component": "Help"
  },
  "view:attendance": {
    "component": "AttendanceManager"
  },
  "view:attendance/analysis": {
    "component": "AttendanceAnalysis"
  },
  "view:attendance/add/month": {
    "component": "AddMonthAttendance"
  },
  "view:attendance/add/day": {
    "component": "AddDayAttendance"
  },
  "view:school": {
    "component": "SchoolsList",
    "config": {
      "title": "Schools List",
      "columns": [
        {
          "component": "DisplayText",
          "title": "Name",
          "id": "name"
        },
        {
          "component": "DisplayText",
          "title": "Medium",
          "id": "medium"
        },
        {
          "component": "DisplayCheckmark",
          "title": "Private School",
          "id": "privateSchool"
        },
        {
          "component": "DisplayText",
          "title": "Board",
          "id": "academicBoard"
        },
        {
          "component": "DisplayText",
          "title": "Up to class",
          "id": "upToClass"
        }
      ],
      "columnGroup": {
        "default": "School Info",
        "mobile": "School Info",
        "groups": [
          {
            "name": "School Info",
            "columns": [
              "name",
              "medium",
              "privateSchool",
              "academicBoard",
              "upToClass"
            ]
          }
        ]
      },
      "filters": [
        {
          "id": "medium"
        },
        {
          "id": "privateSchool",
          "type": "boolean",
          "default": "",
          "true": "Private School",
          "false": "Government School",
          "all": "All"
        }
      ]
    }
  },
  "view:school/:id": {
    "component": "EntityDetails",
    "config": {
      "entity": "School",
      "panels": [
        {
          "title": "Basic Information",
          "components": [
            {
              "title": "",
              "component": "Form",
              "config": {
                "cols": [
                  [
                    {
                      "input": "text",
                      "id": "name",
                      "placeholder": "Name"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "medium",
                      "placeholder": "Medium"
                    }
                  ],
                  [
                    {
                      "input": "checkbox",
                      "id": "privateSchool",
                      "placeholder": "Private School"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "academicBoard",
                      "placeholder": "Board"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "phone",
                      "placeholder": "Contact Number"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "address",
                      "placeholder": "Address"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "website",
                      "placeholder": "Website"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "timing",
                      "placeholder": "School Timing"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "workingDays",
                      "placeholder": "Working Days"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "upToClass",
                      "placeholder": "Teaching up to class"
                    }
                  ],
                  [
                    {
                      "input": "textarea",
                      "id": "remarks",
                      "placeholder": "Remarks"
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          "title": "Students",
          "components": [
            {
              "title": "",
              "component": "ChildrenOverview"
            }
          ]
        }
      ],
      "icon": "university"
    }
  },
  "view:child": {
    "component": "ChildrenList",
    "config": {
      "title": "Children List",
      "columns": [
        {
          "component": "DisplayText",
          "title": "PN",
          "id": "projectNumber"
        },
        {
          "component": "ChildBlock",
          "title": "Name",
          "id": "name"
        },
        {
          "component": "DisplayText",
          "title": "Age",
          "id": "age"
        },
        {
          "component": "DisplayDate",
          "title": "DoB",
          "id": "dateOfBirth"
        },
        {
          "component": "DisplayText",
          "title": "Gender",
          "id": "gender"
        },
        {
          "component": "DisplayText",
          "title": "Class",
          "id": "schoolClass"
        },
        {
          "component": "SchoolBlockWrapper",
          "title": "School",
          "id": "schoolId"
        },
        {
          "component": "RecentAttendanceBlocks",
          "title": "Attendance (School)",
          "id": "schoolAttendance",
          "config": {
            "filterByActivityType": "SCHOOL_CLASS"
          },
          "noSorting": true
        },
        {
          "component": "RecentAttendanceBlocks",
          "title": "Attendance (Coaching)",
          "id": "coachingAttendance",
          "config": {
            "filterByActivityType": "COACHING_CLASS"
          },
          "noSorting": true
        },
        {
          "component": "DisplayText",
          "title": "Center",
          "id": "center"
        },
        {
          "component": "DisplayText",
          "title": "Status",
          "id": "status"
        },
        {
          "component": "DisplayDate",
          "title": "Admission",
          "id": "admissionDate"
        },
        {
          "component": "DisplayText",
          "title": "Mother Tongue",
          "id": "motherTongue"
        },
        {
          "component": "DisplayText",
          "title": "Aadhar",
          "id": "has_aadhar"
        },
        {
          "component": "DisplayText",
          "title": "Bank Account",
          "id": "has_bankAccount"
        },
        {
          "component": "DisplayText",
          "title": "Kanyashree",
          "id": "has_kanyashree"
        },
        {
          "component": "DisplayText",
          "title": "Ration Card",
          "id": "has_rationCard"
        },
        {
          "component": "DisplayText",
          "title": "BPL Card",
          "id": "has_BplCard"
        },
        {
          "component": "DisplayText",
          "title": "Vaccination Status",
          "id": "health_vaccinationStatus"
        },
        {
          "component": "DisplayText",
          "title": "Blood Group",
          "id": "health_bloodGroup"
        },
        {
          "component": "DisplayText",
          "title": "Eye Status",
          "id": "health_eyeHealthStatus"
        },
        {
          "component": "DisplayDate",
          "title": "Last Eye Check-Up",
          "id": "health_lastEyeCheckup"
        },
        {
          "component": "DisplayDate",
          "title": "Last Dental Check-Up",
          "id": "health_lastDentalCheckup"
        },
        {
          "component": "DisplayDate",
          "title": "Last ENT Check-Up",
          "id": "health_lastENTCheckup"
        },
        {
          "component": "DisplayDate",
          "title": "Last Vitamin D",
          "id": "health_lastVitaminD"
        },
        {
          "component": "DisplayDate",
          "title": "Last De-Worming",
          "id": "health_lastDeworming"
        }
      ],
      "columnGroup": {
        "default": "School Info",
        "mobile": "Mobile",
        "groups": [
          {
            "name": "Basic Info",
            "columns": [
              "projectNumber",
              "name",
              "age",
              "gender",
              "schoolClass",
              "schoolId",
              "center",
              "status"
            ]
          },
          {
            "name": "School Info",
            "columns": [
              "projectNumber",
              "name",
              "age",
              "schoolClass",
              "schoolId",
              "schoolAttendance",
              "coachingAttendance",
              "motherTongue"
            ]
          },
          {
            "name": "Status",
            "columns": [
              "projectNumber",
              "name",
              "center",
              "status",
              "admissionDate",
              "has_aadhar",
              "has_kanyashree",
              "has_bankAccount",
              "has_rationCard",
              "has_BplCard"
            ]
          },
          {
            "name": "Health",
            "columns": [
              "projectNumber",
              "name",
              "center",
              "health_vaccinationStatus",
              "health_bloodGroup",
              "health_eyeHealthStatus",
              "health_lastEyeCheckup",
              "health_lastDentalCheckup",
              "health_lastENTCheckup",
              "health_lastVitaminD",
              "health_lastDeworming",
              "gender",
              "age",
              "dateOfBirth"
            ]
          },
          {
            "name": "Mobile",
            "columns": [
              "projectNumber",
              "name",
              "age",
              "schoolId"
            ]
          }
        ]
      },
      "filters": [
        {
          "id": "isActive",
          "type": "boolean",
          "default": "true",
          "true": "Active Children",
          "false": "Inactive",
          "all": "All"
        },
        {
          "id": "center"
        }
      ]
    }
  },
  "view:child/:id": {
    "component": "EntityDetails",
    "config": {
      "icon": "child",
      "entity": "Child",
      "panels": [
        {
          "title": "Basic Information",
          "components": [
            {
              "title": "",
              "component": "Form",
              "config": {
                "cols": [
                  [
                    {
                      "input": "photo",
                      "id": "photoFile",
                      "placeholder": "Photo Filename"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "name",
                      "placeholder": "Name",
                      "required": true
                    },
                    {
                      "input": "text",
                      "id": "projectNumber",
                      "placeholder": "Project Number"
                    },
                    {
                      "input": "text",
                      "id": "center",
                      "placeholder": "Center",
                      "required": true
                    },
                    {
                      "input": "text",
                      "id": "status",
                      "placeholder": "Project Status"
                    }
                  ],
                  [
                    {
                      "input": "age"
                    },
                    {
                      "input": "datepicker",
                      "id": "dateOfBirth",
                      "placeholder": "Date of Birth"
                    },
                    {
                      "input": "select",
                      "id": "gender",
                      "placeholder": "Gender",
                      "options": [
                        "M",
                        "F"
                      ]
                    },
                    {
                      "input": "text",
                      "id": "motherTongue",
                      "placeholder": "Mother Tongue"
                    },
                    {
                      "input": "text",
                      "id": "religion",
                      "placeholder": "Religion"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "admissionDate",
                      "placeholder": "Admission Date"
                    },
                    {
                      "input": "select",
                      "id": "has_aadhar",
                      "placeholder": "Aadhar Status",
                      "options": [
                        "OK (copy with us)",
                        "OK (copy needed for us)",
                        "needs correction",
                        "applied",
                        "doesn't have",
                        "not eligible",
                        ""
                      ]
                    },
                    {
                      "input": "select",
                      "id": "has_kanyashree",
                      "placeholder": "Kanyashree Status",
                      "options": [
                        "OK (copy with us)",
                        "OK (copy needed for us)",
                        "needs correction",
                        "applied",
                        "doesn't have",
                        "not eligible",
                        ""
                      ]
                    },
                    {
                      "input": "select",
                      "id": "has_bankAccount",
                      "placeholder": "Bank Account Status",
                      "options": [
                        "OK (copy with us)",
                        "OK (copy needed for us)",
                        "needs correction",
                        "applied",
                        "doesn't have",
                        "not eligible",
                        ""
                      ]
                    },
                    {
                      "input": "select",
                      "id": "has_rationCard",
                      "placeholder": "Ration Card Status",
                      "options": [
                        "OK (copy with us)",
                        "OK (copy needed for us)",
                        "needs correction",
                        "applied",
                        "doesn't have",
                        "not eligible",
                        ""
                      ]
                    },
                    {
                      "input": "select",
                      "id": "has_BplCard",
                      "placeholder": "BPL Card Status",
                      "options": [
                        "OK (copy with us)",
                        "OK (copy needed for us)",
                        "needs correction",
                        "applied",
                        "doesn't have",
                        "not eligible",
                        ""
                      ]
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "address",
                      "placeholder": "Address"
                    },
                    {
                      "input": "text",
                      "id": "phone",
                      "placeholder": "Phone No."
                    },
                    {
                      "input": "text",
                      "id": "guardianName",
                      "placeholder": "Guardians"
                    },
                    {
                      "input": "text",
                      "id": "preferredTimeForGuardianMeeting",
                      "placeholder": "Preferred time for guardians meeting"
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          "title": "Education",
          "components": [
            {
              "title": "School History",
              "component": "PreviousSchools"
            },
            {
              "title": "ASER Results",
              "component": "Aser"
            }
          ]
        },
        {
          "title": "Attendance",
          "components": [
            {
              "title": "",
              "component": "GroupedChildAttendance"
            }
          ]
        },
        {
          "title": "Notes & Reports",
          "components": [
            {
              "title": "",
              "component": "NotesOfChild"
            }
          ]
        },
        {
          "title": "Health",
          "components": [
            {
              "title": "",
              "component": "Form",
              "config": {
                "cols": [
                  [
                    {
                      "input": "select",
                      "id": "health_vaccinationStatus",
                      "placeholder": "Vaccination Status",
                      "options": [
                        "Good",
                        "Vaccination Due",
                        "Needs Checking",
                        "No Card/Information"
                      ]
                    }
                  ],
                  [
                    {
                      "input": "select",
                      "id": "health_eyeHealthStatus",
                      "placeholder": "Eye Status",
                      "options": [
                        "Good",
                        "Has Glasses",
                        "Needs Glasses",
                        "Needs Checkup"
                      ]
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "health_bloodGroup",
                      "placeholder": "Blood Group"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "health_lastDentalCheckup",
                      "placeholder": "Last Dental Check-Up"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "health_lastEyeCheckup",
                      "placeholder": "Last Eye Check-Up"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "health_lastENTCheckup",
                      "placeholder": "Last ENT Check-Up"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "health_lastVitaminD",
                      "placeholder": "Last Vitamin D"
                    }
                  ],
                  [
                    {
                      "input": "datepicker",
                      "id": "health_lastDeworming",
                      "placeholder": "Last De-Worming"
                    }
                  ]
                ]
              }
            },
            {
              "title": "Height & Weight Tracking",
              "component": "HealthCheckup"
            }
          ]
        },
        {
          "title": "Educational Materials",
          "components": [
            {
              "title": "",
              "component": "EducationalMaterial"
            }
          ]
        },
        {
          "title": "Dropout",
          "components": [
            {
              "title": "",
              "component": "Form",
              "config": {
                "cols": [
                  [
                    {
                      "input": "datepicker",
                      "id": "dropoutDate",
                      "placeholder": "Dropout Date"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "dropoutType",
                      "placeholder": "Dropout Type"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "dropoutRemarks",
                      "placeholder": "Dropout Remarks"
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  },

  "view:recurring-activity": {
    "component": "ActivityList",
    "config": {
      "title": "Recurring Activities",
      "columns": [
        {
          "component": "DisplayText",
          "title": "Title",
          "id": "title"
        },
        {
          "component": "DisplayConfigurableEnum",
          "title": "Type",
          "id": "type"
        },
        {
          "component": "DisplayText",
          "title": "Assigned to",
          "id": "assignedTo"
        }
      ],
      "columnGroup": {
        "default": "All",
        "mobile": "All",
        "groups": [
          {
            "name": "All",
            "columns": [
              "title",
              "type",
              "assignedTo"
            ]
          }
        ]
      },
      "filters": [
        {
          "id": "assignedTo"
        }
      ]
    }
  },
  "view:recurring-activity/:id": {
    "component": "EntityDetails",
    "config": {
      "entity": "RecurringActivity",
      "panels": [
        {
          "title": "Activity",
          "components": [
            {
              "component": "Form",
              "config": {
                "cols": [
                  [
                    {
                      "input": "text",
                      "id": "title",
                      "placeholder": "Title"
                    }
                  ],
                  [
                    {
                      "id": "type",
                      "input": "configurable-enum-select",
                      "enumId": "interaction-type",
                      "placeholder": "Type"
                    }
                  ],
                  [
                    {
                      "input": "text",
                      "id": "assignedTo",
                      "placeholder": "Assigned to"
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          "title": "Participants",
          "components": [
            {
              "component": "ActivityParticipantsSection"
            }
          ]
        },
        {
          "title": "Events & Attendance",
          "components": [
            {
              "component": "ActivityAttendanceSection"
            }
          ]
        }
      ],
      "icon": "calendar"
    }
  },

  "entity:Child": {
    "attributes": [
      {"name": "address", "schema": { "dataType": "string" } },
      {"name": "phone", "schema": { "dataType": "string" } },
      {"name": "guardianName", "schema": { "dataType": "string" } },
      {"name": "preferredTimeForGuardianMeeting", "schema": { "dataType": "string" } },
      {"name": "has_aadhar", "schema": { "dataType": "string" } },
      {"name": "has_bankAccount", "schema": { "dataType": "string" } },
      {"name": "has_kanyashree", "schema": { "dataType": "string" } },
      {"name": "has_rationCard", "schema": { "dataType": "string" } },
      {"name": "has_BplCard", "schema": { "dataType": "string" } },
      {"name": "health_vaccinationStatus", "schema": { "dataType": "string" } },
      {"name": "health_bloodGroup", "schema": { "dataType": "string" } },
      {"name": "health_lastDentalCheckup", "schema": { "dataType": "Date" } },
      {"name": "health_lastEyeCheckup", "schema": { "dataType": "Date" } },
      {"name": "health_lastENTCheckup", "schema": { "dataType": "Date" } },
      {"name": "health_eyeHealthStatus", "schema": { "dataType": "string" } },
      {"name": "health_lastVitaminD", "schema": { "dataType": "Date" } },
      {"name": "health_lastDeworming", "schema": { "dataType": "Date" } }
    ]
  }
}