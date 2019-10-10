const level3Array1 = [
    'Project development',
    'Resources & Engineering',
    'Logistics, Construction & Installation',
    'Component / Equipment supplier',
    'Service and O&M provider',
    'Plant/Device operator'
    ],
    level3Array2 = [
        'Exploration & Project development',
        'Resources & Engineering',
        'Construction & Installation',
        'Logistics & Handling',
        'Component / Equipment supplier',
        'Production, treatment, upgrading',
    ],
    level3Array3 = [
        'Project development',
        'Resources & Engineering',
        'Construction & Installation',
        'Component / Equipment manufacturer',
        'Service (O&M)',
        'Operator'
    ],
    level3Array4 = [
        'Energy audits',
        'Energy analytics',
        'Consulting',
        'New services',
        'Green certifications'
    ],
    level3Array5 = [
        'Advanced motor controlling',
        'Efficient motors & Components',
        'Waste recovery',
        'Sorting and recycling',
        'Process optimization'
    ],
    level3Array6 = [
        'Feedstock',
        'Process (treatment, upgrading)',
        'End product',
        'Services',
        'Turnkey developer',
        'Engineering',
        'Construction & Installation',
        'Component / Equipment supplier',
        'O&M'
    ],
    level3Array7 = [
        'Developer',
        'Resources & Engineering',
        'Logistics & Construction',
        'Component manufacturer',
        'Turbine manufacturer',
        'Service (O&M)',
        'Plant owner & Ene. Mgmt'
    ],
    level3Array8 = [
        'Developer',
        'Resources & Engineering',
        'Logistics & Construction',
        'Component manufacturer',
        'Equipment manufacturer',
        'Service (O&M)',
        'Electricity storage',
        'Plant owner & Ene. Mgmt'
    ],
    level3Array9 = [
        'Developer',
        'Resources & Engineering & Construction',
        'Production equipment manufacturer',
        'Component manufacturer',
        'Cell manufacturer',
        'Module manufacturer',
        'Electricity storage',
        'Service (O&M)',
        'Plant owner & Ene. Mgmt',
        'PV consumer products',
        'Building integrated PV'
    ],
    level3Array10 = [
        'Project development',
        'Resources & Engineering',
        'Construction',
        'Equipment / Component manufacturer',
        'Service (O&M)',
        'System operator',
        'Metering function'
    ],
    level3Array11 = [
        'Parts & Components',
        'Vehicle manufacturer',
        'Vehicle sales / Distribution',
        'Fleet / Vehicle owner',
        'Infrastructure',
        'Energy supply',
        'Mobility services'
    ],
    level3Array12 = [
        'Monitoring',
        'Prevention',
        'Cleanup'
    ];

export const activitySector = {
    'Conventional and clean coal technologies': {
        'Gas and steam turbines': level3Array1,
        'Internal combustion and reciprocation': level3Array1,
        'Fossile natural gas': level3Array2,
        'Coal': level3Array2,
    },
    'Energy storage': {
        'Consumer electronics': [],
        'Vehicles storage': [],
        'Grid storage - Behind the meter': level3Array3,
        'Grid storage - Large scale': level3Array3
    },
    'Energy efficiency': {
        'Industry IOT': level3Array4,
        'Industrial efficiency': level3Array5
    },
    'Energy from chemical fuels': {
        'BioFuels and biochemicals': level3Array6,
        'Hydrogen': level3Array6,
        'Biomass': level3Array6
    },
    'Renewable energies': {
        'Geothermal': level3Array7,
        'Hydro': level3Array7,
        'Marine': level3Array8,
        'Offshore wind': level3Array7,
        'Onshore wind': level3Array7,
        'Solar PV': level3Array9,
        'Solar thermal': level3Array8
    },
    'Smart buildings and cities': {
        'Smart home': [
            'Energy analytics',
            'Smart housing components',
            'Smart lightning',
            'Smart traditional heating systems',
            'Efficient design',
            'New housing solutions',
            'Smart HVAC',
            'New digital services',
            'ESCO B2C'
        ],
        'Smart commercial buildings': [
            'Energy analytics',
            'Smart housing components',
            'Smart lightning',
            'Smart traditional heating systems',
            'Efficient design',
            'Smart HVAC',
            'New digital services',
            'ESCO B2C'
        ],
        'Green data': [
            'Green data centers',
            'Cybersecurity',
            'New digital services'
        ],
        'Connected city': [

        ],
        'District heating': level3Array10
    },
    'Smart electric grid': {
        'Microgrids': level3Array10,
        'Offgrid': level3Array10,
        'High volume power lines': level3Array10,
        'Medium voltage power lines': level3Array10,
        'Low voltage power lines': level3Array10,
        'Demand response': [],
        'Blockchain': [],
    },
    'Nuclear instrumentation': {
        'Efficient nuclear': [
            'Project development',
            'Resources & Engineering',
            'Logistics & Construction',
            'Component manufacturer',
            'Equipment manufacturer',
            'Service (O&M)',
            'Plant owner & Ene. Mgmt'
        ]
    },
    'Mobility': {
        'Internal combustion and hybrid vehicles': level3Array11,
        'Electric vehicle': level3Array11,
        'Fuel cells vehicles': level3Array11,
        'Short range vehicles': level3Array11,
        'Digital services': []
    },
    'Clean air': {
        'Carbon capturing': level3Array12,
        'Flue gas treatment': level3Array12,
        'Other pollutans': level3Array12,
        'Carbon credit services': []
    },
    'Circular economies': {
        'Second use': [
            'Product design',
            'Efficient production'
        ],
        'Circular consumption': [
            'Digital services',
            'Product as a service',
            'Cost of ownership reformulation'
        ],
        'Waste management': [
            'Waste heat recovery',
            'Biological waste into value',
            'Sorting and recycling'
        ],
        'Life extension': [
            'Preserve current assets',
            'Rethink current assets',
            'Collaborative economy'
        ]
    }
};


// Dropdown #1
// Fill it with Object.keys(activitySector)
// On change -> callback fn(selectedLevel1)

// Dropdown # 2
// Until nothing is selected in #1 this one is disabled
// Fill it with Object.keys(activitySector[selectedLevel1])
// On change -> callback fn(selectedLevel2)

// Dropdown #3
// Until nothing is selected in #2 this one is disabled
// Fill it with activitySector[selectedLevel1][selectedLevel2]
