import { Question } from "@/types/scorecard";

export const questions: Question[] = [
    // ===== E1: Governance & Strategy =====
    {
        QID: "1.1",
        Section: "E1",
        Question: "To what extent do we have a governance structure that openly and transparently engages all relevant stakeholders in this community?",
        Tooltip: `Governance arrangements should be evaluated for the following:
1. Stakeholders included: these may include (but are not restricted to):
2. Community: property owners, HOAs, renters, farmers & landowners, community organizations & associations (churches, clubs etc), minorities of all kinds - ethnic, linguistic, physical abilities, medical conditions;
3. Neighboring communities (for planning and execution of mitigation and response activities, sharing resources, helping evacuees, sharing emergency response capabilities, help with rebuilding, and so on).
4. Business (especially those with local presence): businesses - large and small - as applicable: owners, CXO,
5. Utilities (power, water, sanitation, communications),
6. Other non-governmental critical asset owners
7. Insurers/reinsurers
8. Government: Wildfire Prevention Districts (or equivalent); community government(s). As applicable, planning, code enforcement, fire department, emergency management, public works, engineering, highways, community development, economic development, public health, finance (for example for budgets and for bond financing of mitigation activity), parks and recreation. County government - as above, plus Property Tax. State government - legislators, finance, state fire services, state departments of water resources natural resources, state EPAs. Federal Agencies - Federal Emergency Management Agency (FEMA), National Atmospheric and Space Administration (NASA), US Department of Agriculture (USDA - includes Bureau of Land Management -BLM- and US Forest Service), Environmental Protection Agency (USDA), etc.
9. First responders, public health agencies, education districts, academia.
10. The Earth/the environment itself (and whoever speaks for it): Conservation districts and groups
11. Structure: clear roles and active participation from all stakeholders in identifying, planning, preventing and drilling for wildfire risk.
12. Inclusivity: engaged presence of minority or disadvantaged segments of the community on an equal footing with other stakeholders.
13. Openness: Meetings need to be open to all with passion and interest in the subject. They should not require a "warm introduction" from an existing stakeholder from within the network, for access.
14. Transparency: completeness of information sharing.`,
        Scale0: "Not in place: No effective governance for wildfire resilience; engagement is ad-hoc or closed.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Inclusive & Transparent",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "1.2",
        Section: "E1",
        Question: "To what extent is there engagement beyond the community?",
        Tooltip: `Communities may need to draw on wider ideas and expertise, taking care also to engage their own experts such as the local fire department in these activities:
1. Subject matter expertise: stakeholders working on wildfire risk reduction need to have access to subject matter expertise on multiple issues.
2. Alliances: these might include, as examples: Fire-Adapted Communities, Firesafe Councils, Crowddoing, universities, other communities currently also working on wildfire DRR.`,
        Scale0: "Not in place: No external engagement or alliances.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Extensive Networks",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "1.3",
        Section: "E1",
        Question: "To what extent do we have a comprehensive strategy and plan for wildfire risk reduction in the community and around it, aligned consistently across all stakeholders, and regularly updated?",
        Tooltip: `The wildfire strategy should be evaluated on the following dimensions:
1. Comprehensiveness: Clearly, wildfire risk reduction requires a plan that addresses all aspects of the issue. You can derive many of the headings needed for that plan from the structure of this scorecard:
2. Governance and collaboration structure, plans, targets and metrics, stakeholder sign-off (this Essential, E1)
3. Assessment of hazard, vulnerability and exposure at all relevant scales - property, community, landscape, also combined risks (E2)
4. Financial architecture (E3) - funding (tax, grants, bonds, loans), tax incentives, resilience "dividends" or co-benefits, insurance, in kind contributions (eg loan of earthmoving equipment), carbon credits
5. Land-use and building code: effectiveness of zoning and codes, standards embodied, enforcement levels, changes required (E4)
6. Use and protection of natural buffers, and consideration of all relevant nature-based solutions, ones that are locally familiar and scientifically valid (E5).
7. Required skills and data (E6)
8. Community engagement (E7)
9. Critical infrastructure assets - energy, telecommunications, water, sanitation, healthcare, highways etc, and the roles of their owners (E8)
10. Emergency response assets (E8/9)
11. Event warning, response, coordination and responsibilities (E9)
12. Post event program - actions for social and economic reboot (E10)
13. Coordination: Ideally, this will be through a single body embracing all stakeholders, including local businesses.
14. Alignment: it is essential to ensure that stakeholders' own plans share alignment and realism.
15. Regularity of updates: all strategies and plans age rapidly, and need to be updated.`,
        Scale0: "Not in place: No comprehensive strategy exists.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive & Updated",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "1.4",
        Section: "E1",
        Question: "To what extent do we routinely consider fire risk in all policy creation and decision-making in the community?",
        Tooltip: `Policy and decision making processes should be evaluated on these dimensions:
1. Policy making: all existing policies should be evaluated for absence of conflicts with the goal of wildfire risk reduction.
2. Decision Making: just as the financial implications of any decision would routinely be considered, it is essential also to consider the wildfire risk implications - for example where a WUI development would exacerbate wildfire risk, or where creating a proposed trail might also create a firebreak. There may be no wildfire risk implications, but this should be actively confirmed.`,
        Scale0: "Not in place: Fire risk not considered in decisions.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Integrated",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E2: Risk Assessment =====
    {
        QID: "2.1",
        Section: "E2",
        Question: "To what extent is the likelihood of wildfires in the landscape in and around this community, both now and in the future, assessed, mapped and understood?",
        Tooltip: `To manage and mitigate wildfire hazard, it is essential to understand the many factors in the landscape around the community that could exacerbate (or attenuate) wildfire. Consider them under 3 headings: topography, weather and fuel.

May exacerbate wildfire hazard:
- Topography: Extreme slopes, wind funnel effects, burn scars on steep land
- Weather: Strong dry wind patterns (Chinook, Santa Ana), lightning, temperature/humidity patterns
- Fuel: Flammable vegetation, bark beetle infestation, poor vegetation management, more than 7 years since last burn

May attenuate wildfire hazard:
- Surface water, wetlands, riparian zones
- Rain or snow, higher moisture content in vegetation
- Less flammable vegetation, recently burned areas, fuel breaks, effective vegetation management

Hazard understanding should cover: Vegetation patterns, wildfire history, weather patterns, topological features, steep slopes prone to landslides, surface water, and ignition sources.

Communities need to create a regularly updated "perimeter of understanding" extending at least 20 miles beyond the boundaries of the community itself.`,
        Scale0: "Not in place: No hazard assessment exists.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Mapping",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "2.2",
        Section: "E2",
        Question: "To what extent is the community as a whole at risk from wildfires?",
        Tooltip: `Community-scale wildfire hazard and exposure factors include:
1. Wildland-urban interface (WUI): Communities extending into the WUI are significantly more exposed to wildfire hazards due to a greater "attack surface" for fires and more potential ignition sources.
2. Evacuation routes: Communities with single evacuation routes, or those with narrow streets, have experienced loss of life from fast-moving wildfires that cut off escape.
3. Building density: more densely packed buildings increase exposure - more prone to being caught up in a single wildfire incident.
4. Flammable facilities: Gas & propane stations, lumber yards, or buildings with wood shake roofs may increase hazard.
5. Landscaping: Parks, medians, office parks may contain plants or features like wood-chip mulch that increase wildfire hazard.

In addition, wildfires pose risks from smoke inhalation, even in communities that may not have a direct fire risk.`,
        Scale0: "Not in place: Community risk not assessed.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Understood",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "2.3",
        Section: "E2",
        Question: "To what extent are individual properties at risk from wildfires?",
        Tooltip: `Individual property exposure and vulnerability factors which need to be evaluated include:
1. Standards: properties built or retrofitted to a standard such as NFPA1144 or other standards – in how many buildings, and how thoroughly, have the standards been implemented?
2. Building styles, spacing and materials: Some building materials are more flammable than others. For example, in California, many houses have wooden siding or solid wood walls, and may be separated by wooden fencing. Closely spaced properties (with a structure separation distance of <30ft) may be more collectively vulnerable than those that are spread out.`,
        Scale0: "Not in place: Property risk not assessed.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Properties Assessed",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "2.4",
        Section: "E2",
        Question: "To what extent has the community assembled known wildfire hazards exposures and vulnerabilities into scenarios as an aid to assessing the adequacy of proposed responses and post event arrangements?",
        Tooltip: `In order to enable effective financial planning (E3) land use planning (E4 and E5), data, data sharing and skills needs (E6), community mobilization (E7), infrastructure investment (E8), emergency planning (E9) and post event response planning (E10), it is recommended that risks be assembled into scenarios.

Ideally there will be a minimum of two – a "moderate" case and a catastrophic, worst case. They should address hazard, exposure and vulnerability; and they should be updated regularly.

They should also include multi-hazards. One 2021 multi-hazard example was where communities had to deal with wildfires while also maintaining precautions for dealing with COVID-19.

Total Community and Economic Vulnerability: To what extent is the population of the community at risk of displacement, and its economy at risk of stoppage for 1 month or longer due to vulnerability to a wildfire?`,
        Scale0: "Not in place: No scenarios developed.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Multi-Scenario Planning",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E3: Financial Planning & Insurance =====
    {
        QID: "3.1",
        Section: "E3",
        Question: "To what extent has the community researched and explored all possible approaches to funding the work required to reduce wildfire risk?",
        Tooltip: `Many communities do not have a fully developed "atlas" of where all possible sources of resilience funding may lie. Communities should evaluate the thoroughness of their search for alternative financing methods and sources that may include:

1. Government: grants, including matching grants; other government agencies that may have a direct interest in some aspect of resilience; taxes and surcharges.
2. Non-profit or low profit: development banks and aid organizations; foundations; social impact or resilience bonds; crowd-funding.
3. For-profit: development fees; public-private partnerships; bonds; corporate funding - insurance, big companies; leasing, corporate philanthropy.
4. "Dividends" or co-benefits:
   - "Inbound" dividends: where investments elsewhere in the community have additional resilience benefits.
   - "Outbound" dividends: where investments in resilience also provides an additional, non-resilience benefit - for example where creating firebreaks enables recreational trails.`,
        Scale0: "Not in place: No funding research conducted.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Sources Explored",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "3.2",
        Section: "E3",
        Question: "To what extent does the community have a coherent financial plan for the work required to reduce its wildfire risk (including its post event recovery)?",
        Tooltip: `Key evaluation points for the financial plan will include the following:
1. Feasibility: sufficient funds are available, or realistically expected to be available (even if not immediately), to cover anticipated needs.
2. Integrated sources: if (as is likely) funding comes from several sources, the combined funding needs to be coordinated and mutually consistent.
3. Protection: funds need to persist through changes in political leadership - funding for projected capital and consequent operating expenses needs to be protected from being siphoned off for other uses.
4. Contingency funds: sources of funds for post event recovery (some combination of insurance, emergency grants and loans from higher levels of government, or from local taxation) need to be identified as needed.`,
        Scale0: "Not in place: No financial plan exists.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Plan",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "3.3",
        Section: "E3",
        Question: "To what extent is insurance adequate in the community for wildfire risks?",
        Tooltip: `Adequacy of insurance cover is a major determinant of a community's ability to recover from wildfires. ("Adequate" means covering all instants and extents of realistically anticipated losses). This needs to be evaluated in:

1. Property: the ability of property owners to repair or rebuild their homes, and recoup any costs from loss of use.
2. Health: for burn injury, smoke inhalation, psychological impacts of trauma and loss.
3. Automobiles: vehicles that may be burned in wildfires are covered by automobile insurance.
4. Non-domestic (business) property and business continuity insurance.
5. Forests, crops and livestock: landowners and farmers need to ensure adequate coverage.
6. Community assets (buildings, facilities, infrastructure): may be self-insured or insured by higher levels of government.
7. Community liabilities: where a community is responsible for starting a wildfire, or is culpable for some failure.

Insurance may be traditional or parametric. Community-based catastrophe insurance (CBCI) may also increase affordability.`,
        Scale0: "Not in place: Insurance inadequate or unknown.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Coverage",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "3.4",
        Section: "E3",
        Question: "To what extent has the community created appropriate financial incentives to homeowners, businesses, and community groups to reduce their exposure to wildfire risk, and avoided adverse incentives?",
        Tooltip: `The financial plan should be evaluated for its coverage of Incentives to homeowners and businesses. These can come from multiple sources including:
- Free advice
- Discounts at local hardware stores, and with builders approved for property hardening work
- Discounts on other community-provided services
- Discounts on insurance in exchange for carrying out mitigation work
- Expedited (and discounted) permitting and inspections
- Grants - matching and outright
- Low interest loans
- Property and other tax incentives
- Organized crowdfunding
- Prizes and draws

Just as the community should encourage wildfire risk reduction, it should avoid providing incentives for activities that will increase risk, such as: draining wetlands, building in the WUI, fire suppression over controlled burns, permitting non-compliant buildings.`,
        Scale0: "Not in place: No incentive programs.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Robust Incentives",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E4: Land Use Zoning & Building Codes =====
    {
        QID: "4.1",
        Section: "E4",
        Question: "To what extent has land use zoning been defined with wildfire risk in mind - for example, restricting building out into the wildland urban interface (WUI) - and is it enforced?",
        Tooltip: `The effectiveness of land use zoning needs to be evaluated.

Many communities in wildfire-prone areas were originally laid out with no thought of the fire risk at all and as a result find themselves seriously exposed. In particular, communities building into the WUI are known to exacerbate the wildfire risk, essentially because they increase the "attack surface" (the extent of directly bordering on wild or open land) that a fire can take to individual properties, and because they may also increase the range of ignition sources in an area.

Older communities may have been established with no consideration of this issue, and indeed smaller and/or older rural settlements may be all WUI.

Lack of enforcement can undermine the effectiveness in wildfire risk reduction of any land zoning policy or rules, and is an issue in many countries and many US States. There may be "grandfathered in" properties where land use zoning is now otherwise enforced, or the issue may be ongoing with new non-compliant properties still being built.`,
        Scale0: "Not in place: No fire-aware zoning.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Enforced & Effective",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "4.2",
        Section: "E4",
        Question: "To what extent do building codes mandate fire resistant construction techniques and community/street layouts, and is it enforced?",
        Tooltip: `The effectiveness of building codes also need to be evaluated.

While each community will have its own building codes the key is to be certain that they maximize fire resistance, for example with: non-combustible roofing; short eaves; mesh-covered and/or double-baffle roof vents; double-pane windows; combustion-resistant wall coverings (for example stucco, as opposed to wood siding); fire resistant decking; 30 feet of defensible space; gravel instead of mulch; and sealed gaps where utilities enter each property.

Additional standards from external bodies may enable higher levels of wildfire risk mitigation than local building codes provide for. Examples: NFPA 1144, California Building Code Chapter 7a, ASTM E05 series, IBHS Wildfire Prepared Home standards, Factory Mutual standards, Fire Adapted Community standards.

As regards layouts, people have died in wildfires as a result of restricted carrying capacity on local roads, or when single access/escape routes became blocked.

As with zoning, lack of enforcement can undermine the effectiveness in wildfire risk reduction of any building codes.`,
        Scale0: "Not in place: No fire-resistant codes.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Strict & Enforced",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E5: Nature-Based Solutions =====
    {
        QID: "5.1",
        Section: "E5",
        Question: "To what extent does the community understand which ecosystem services enable wildfire risk reduction, and are they protected and in good health?",
        Tooltip: `Ecosystem features that act as natural buffers, reducing wildfire risk, may include: surface water; floodplains and riparian zones; any natural feature that encourages hydration and hydration retention; healthy and hydrated soil; certain plant types.

If some aspect of a community's wildfire DRR positioning is dependent on ecosystem services, then it is essential to maintain the health and buffering capacity of those services:

1. Effective forest and under-storey management: creates a forest which can accommodate fire without allowing it to flare out of control.
2. Managing groundwater depletion: if not addressed, depletion may weaken trees and make them more susceptible to beetle attack. Grey-water recycling may reduce groundwater draw. Replenishing groundwater can help recharge streams and rivers which form natural "blue" fire-breaks.
3. Protection of keystone or critical species: has knock-on implications. The reintroduction of wolves in Yellowstone improved riparian zones.
4. Management of invasives: for example, gum or eucalyptus trees are highly flammable and displace native species.

To ensure long-term preservation of natural buffers, it may be necessary to erect legal protection through conservation easements, outright purchase, or making them into regional parks.`,
        Scale0: "Not in place: Ecosystem services not understood.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Protected & Healthy",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "5.2",
        Section: "E5",
        Question: "To what extent are ecosystem services identified by stakeholders as having a financial value?",
        Tooltip: `The extent to which valuation has been applied to ecosystem services should be evaluated. Those that help with wildfire DRR are capable of being valued in several ways: the economic value (GDP), property and lives they help to protect; decreased erosion; wind resistance; reduction in fire speed from "green fire breaks"; reduced carbon cost of catastrophic wildfire; improved amenity value.

When they are valued, it becomes easier to make the business case for protecting and expanding them.

Additionally, nature based solutions often have "dividends" or co-benefits beyond wildfire risk reduction:
1. Land co-benefits: landscape hydration, land fertility, landscape amenity value
2. Water co-benefits: protection of water resources and clean water
3. Wildlife co-benefits: benefits to other species with value of their own
4. Air co-benefits: clean air (from less smoke)
5. Property co-benefits: property values (from greater resilience); decreased heat island effects; potentially decreased insurance costs`,
        Scale0: "Not in place: No ecosystem valuation.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Valued",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "5.3",
        Section: "E5",
        Question: "To what extent does the community balance and combine nature-based solutions with technological solutions?",
        Tooltip: `Nature based solutions need to be considered as one set of tools, whose use should be maximized, but not to the exclusion of technology-based solutions where these may be more applicable. Often, they will be used in combination.

Examples of nature based solutions include:
1. Grazing: Fuel load reduction via goat & sheep (and, on grasslands, cattle) grazing can reduce the chance of wildfires becoming crown fires. The animals also fertilize the land and may offer edible byproducts.
2. Hydration: allowing streams to spread out from man-made channels, and encouraging beavers are frequent nature-based interventions. Also, reducing aquifer drawdown through greywater recycling, rain gardens and rainwater harvesting.
3. Wind breaks: created with trees to change wind speeds. Wind speed can be one of the greatest accelerants to catastrophic wildfire spread.

For example, mechanical means or prescribed burns may be used to remove dense understory vegetation, but goats or sheep could then be used annually to prevent it regrowing.`,
        Scale0: "Not in place: No balance of solutions.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Integrated Approach",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E6: Skills, Knowledge & Data =====
    {
        QID: "6.1",
        Section: "E6",
        Question: "To what extent does the community have access to the skills, knowledge and experience it may need to minimize its wildfire risk, in the numbers required?",
        Tooltip: `Communities need to evaluate whether they have access to the skills, knowledge and experience they need. These may include:
1. Essential 1: governance and organization structures; lobbying; planning, program and project management.
2. Essential 2: climate and meteorology; risk understanding and analysis; risk communication.
3. Essential 3: economics and investment appraisal; finances (CPAs, budget analysis); insurance; grant writing.
4. Essential 4: building code interpretation and application; fire resistant construction techniques; city planning.
5. Essential 5: landscape ecology, biology, botany; arboriculture, forestry and landscaping; ecosystem valuation; farming and livestock; natural mitigation methods.
6. Essential 6: data science and analysis.
7. Essential 7: community development and activism; local history and cultural history; languages spoken in the area; social media.
8. Essential 8: building and construction; civil, mechanical and electrical engineering; geology; energy and water management.
9. Essential 9: emergency/first response; medical; traffic management; law and order; logistics; communications.
10. Essential 10: loss adjustment and damage assessment; event response and area recovery.

Potential sources may include: universities, government agencies, NGOs, consultancies, volunteers, neighboring communities, local employers.`,
        Scale0: "Not in place: Skills gaps not identified.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Skills Available",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "6.2",
        Section: "E6",
        Question: "To what extent does the community attempt to learn from the knowledge and experience of other – similar and dissimilar – communities?",
        Tooltip: `The experience of others sharing the same wildfire DRR challenge is a powerful capability builder. Capturing this experience could take several forms, ranging from case studies, through ad hoc one-to-one conversations, through to regular multi-participant learning or study groups.

Some form of formal alliance structure between communities may help to cement the level of sharing of knowledge or resources or best practices, or other collaboration.`,
        Scale0: "Not in place: No inter-community learning.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Active Learning Networks",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "6.3",
        Section: "E6",
        Question: "To what extent does the community have access to the data it needs to reduce its wildfire risk, and is this data shared?",
        Tooltip: `In addition to data on current and future hazard, exposure and vulnerability (see E2), communities' data needs will be extensive:
1. Essential 1: plans, objectives and activities of any other organization or group whose activity affects the wildfire resilience; progress, status and issues.
2. Essential 2: data on hazard, exposure and vulnerability.
3. Essential 3: budgets and financial sources; mitigation costs.
4. Essential 4: future development plans and approvals; status of zone and code compliance.
5. Essential 5: location, extent and health of natural buffers.
6. Essential 6: skills levels and sources, a catalog of data needs.
7. Essential 7: community make-up, status of community engagement efforts; names and addresses of those needing extra help to evacuate.
8. Essential 8: capacities and capabilities of utility response mechanisms; identification, location and ownership of critical assets.
9. Essential 9: capacities and capabilities of the local health system, first responders, and law & order; names, locations and capacities of emergency accommodation.
10. Essential 10: contact and contract/MOU details for all those likely to be involved in post event response.

Data sharing is critical to ensure that all organizational stakeholders are operating from compatible assumptions.`,
        Scale0: "Not in place: Data needs not identified.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive & Shared",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E7: Community Engagement =====
    {
        QID: "7.1",
        Section: "E7",
        Question: 'To what extent is the community "connected" and cohesive internally, with a "mutual-help" mentality?',
        Tooltip: `Community connectedness is crucial to wildfire resilience: "local connections shape fire outcomes". Measures to evaluate include:

1. Evidence of mutual-help from prior emergencies: community and neighborhood "buddy" plans; friends or relatives that each family could call upon for shelter if evacuated; collaboration on mitigation planning, implementation and measurement.
2. Participation levels: frequency of, and levels of participation in community events generally.
3. Inclusion: evidence that the above spans different minority groups.
4. Absence of, or mitigation strategy available for, adverse factors:
   - Individuals or groups choosing not to participate
   - High resident turnover
   - Crime and violence
   - Poverty and food insecurity
   - High score on CDC/ADSR Social Vulnerability Index
   - High incidence of mental/physical health issues
   - Specific obstacles to engagement – language barriers, lack of meeting places, family role structures
   - Low score on social vulnerability in FEMA National Risk Index

When assessing connectedness, consider blocks and neighborhoods within the wider community.`,
        Scale0: "Not in place: Community disconnected.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Highly Connected",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "7.2",
        Section: "E7",
        Question: "To what extent has the community (the entire population of the area in question) been fully and effectively engaged?",
        Tooltip: `There are many aspects to full and effective engagement that need to be evaluated:

1. Engagement channels: community engagement will be through organizations working directly on wildfire issues, but also organizations serving other purposes – schools, HOAs, churches, Kiwanis, Rotary Clubs, 4H, sports teams, Scouts and Guides.
2. "U-Shaped" model: engagement encompasses all three dimensions - "top-down" dissemination from government to citizens; "side-to-side" (neighbor to neighbor) collaboration; and "bottom-up" communication and feedback back to government.
3. Content: engagement needs to address issues such as release of risk data which might impact property values, and reservations about controlled burns.
4. Engagement with vulnerable groups: lower income people, different ethnicities, disabled persons, the elderly, those without transportation, those with respiratory issues, those with different first languages.
5. Persistence: strategies for "hold-outs" who are reluctant to become involved.
6. Engagement with neighboring communities: mutual benefit in engaging other communities if their lack of activity weakens your risk reduction efforts.
7. Maintenance over time: community outreach is never a "one-shot" exercise.`,
        Scale0: "Not in place: No community engagement.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Full Engagement",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "7.3",
        Section: "E7",
        Question: "To what extent have specific interests and stakeholders been engaged?",
        Tooltip: `Dimensions of specific stakeholder engagement that need to be evaluated:

1. Schools: instruction on fire response can be expanded into consideration of factors that drive fires, potential responses, and dividends from fire mitigation.
2. Universities: can be engaged through environmental science, building science, architecture, meteorology, public administration on risk analysis, mapping, landscape management, ecosystem protection, community engagement.
3. Businesses: securing business engagement based on realistic risk appraisal is essential. Communities can use businesses as communications channels to their workforces. Businesses may provide employees with time to volunteer for mitigation work. They may help their workforce become more resilient with grants towards property hardening.
4. Retailers: hardware stores running displays on home fire-hardening; gardening stores with fire resistant plants.
5. Contractors: could create fire-hardening packages or "tune-ups".
6. Landlords: have a responsibility to help their tenants engage with wildfire risk mitigation.
7. Landowners: have a responsibility to address wildfire risks arising on their land.`,
        Scale0: "Not in place: Stakeholders not engaged.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Stakeholders Engaged",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "7.4",
        Section: "E7",
        Question: 'To what extent has outreach and collaboration been carried out using a "multi-media, multi-channel" strategy, and its effectiveness validated?',
        Tooltip: `Simple emails or newsletters alone will not suffice for outreach. The use of all possible channels should be evaluated:
- Social media
- Emails
- Physical advertising
- Physical mailers
- Newsletters
- Booths at local or county fairs
- Parades
- Schools
- Employers
- Retailers and contractors
- Friends and family

Self-evidently, communications and outreach need to be effective - clear, relevant, accurate and acted upon - and validated as such by all segments of the community.`,
        Scale0: "Not in place: Single-channel only.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Multi-Channel & Validated",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E8: Critical Infrastructure =====
    {
        QID: "8.1",
        Section: "E8",
        Question: "To what extent are the community's infrastructure systems at risk of loss or damage in the event of a wildfire. How adequate are any back-up options that may be available?",
        Tooltip: `Infrastructure systems and their critical component assets should be evaluated for resilience. For each system, the community needs to know:
1. Which critical assets are in areas of high fire risk and have not been hardened?
2. What areas and population segments are vulnerable to loss of service?
3. Can the system be segmented to minimize damage?
4. What is the potential duration of service loss?
5. What backups exist?

Systems to evaluate:
- Communications: cellphone, internet, satellite, landlines
- Electricity: generation and distribution; how many homes have back-up generators; who is dependent on power for in-home medical equipment
- Gas: may be critical if the community is extensively gas powered
- Water supply: sources, treatment and distribution; wells as alternative sources
- Waste-water: collection, treatment and discharge
- Roads: critical for emergency response, evacuation and post event recovery; choke-points
- Other transportation: rail, ports, airports
- Healthcare: hospitals, outpatient facilities, old-people's homes, supply warehouses, ambulance stations
- Education: schools, universities, supply warehouses, school buses`,
        Scale0: "Not in place: Infrastructure risk unknown.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Resilient Systems",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "8.2",
        Section: "E8",
        Question: "To what extent are critical emergency response assets at risk of loss or damage in the event of a wildfire?",
        Tooltip: `Classes of assets involved here, that may themselves be vulnerable to wildfire damage, and whose vulnerability communities need to understand:

1. Fire service assets: including fire stations, maintenance facilities, communications facilities and equipment stores. (Greenville Fire station was destroyed in the Dixie fire in California in August 2021).
2. Police service assets: including police stations, maintenance facilities, communications facilities and equipment stores.
3. Emergency coordination centers: (if separate from fire or police facilities).

In each case, one issue will be whether backup facilities exist. These will presumably be further away, but first responders will still require a base to work from and emergency response centers, if separate, will need to be re-established elsewhere should they be lost or inaccessible during a wildfire.`,
        Scale0: "Not in place: Emergency assets at risk.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Protected & Backed-up",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "8.3",
        Section: "E8",
        Question: "To what extent is the community's administrative infrastructure and data at risk of loss or damage in the event of a wildfire?",
        Tooltip: `The vulnerability of the community's administration infrastructure (offices, supply warehouses, depots etc) for applicable tiers of government and other agencies to loss, damage or loss of access may be critical for emergency response and will be for post event recovery.

This definition would also include post offices, welfare offices, DMVs and the like. Loss of access would also include loss of communications access (phones, internet etc).

Administrative data, including personal records, infrastructure drawings, permits, financial data and many other items may be vulnerable to loss from a wildfire where computing or data storage facilities are damaged, resulting in inconvenience and conceivably risks to community members, and excessive additional costs for the administration.

Ideally, data will be backed up off site at a location in a different region from the community and will be available by "hot standby" arrangement.`,
        Scale0: "Not in place: Admin data at risk.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Backed-up",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "8.4",
        Section: "E8",
        Question: "To what extent does the community understand which are its critical assets and how they are interconnected?",
        Tooltip: `Few communities have a fully inclusive list of their critical assets and fewer still understand how they are related to each other.

This means that the possibilities for cascading system failures may not be understood and may come as a complete surprise.

For example, loss of an electricity substation in a wildfire could cause failure of a water treatment facility, which in turn makes a hospital several miles away unusable - a cascading failure spanning three functionally and geographically separate systems.`,
        Scale0: "Not in place: Interconnections unknown.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Mapped",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E9: Emergency Response =====
    {
        QID: "9.1",
        Section: "E9",
        Question: "To what extent are detection and warning systems available that coverage for the entire area of the community?",
        Tooltip: `Key considerations for evaluating detection and warning systems include:
1. Speed of detection: 30 minutes' extra notice can make the difference between fire fighters finding a small spot fire vs. an out of control conflagration.
2. Night-time capability: many of the worst catastrophic wildfires start at night and grow by morning. Night-time detection requires infrared cameras.
3. Reach: warnings need to reach the entire population, allowing for the fact that some people may not have phones. Warning systems may be via physical sirens, electronic billboards, TV, radio, web or various forms of social media (or preferably all of these).
4. Reliability: can the system be trusted to function at all times?
5. Smoke: warning systems need also to warn of smoke drifting into the area from other fires.
6. Multi-hazard: fire and smoke warnings need to be clearly differentiated from each other from other hazards.`,
        Scale0: "Not in place: No detection/warning systems.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Coverage",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "9.2",
        Section: "E9",
        Question: "To what extent are there up-to-date emergency response plans that address the risks identified in Essential 2?",
        Tooltip: `Key considerations for evaluating emergency response plans include:

1. Coverage: plans need to cover, as a minimum:
   - Command and control - overall command, coordination with other agencies and cities, roles, responsibilities procedures
   - Evacuations (including hospitals, jails, etc.)
   - Communication systems
   - Critical asset management (including likely "failure chains")
   - Fire service response
   - Medical response
   - Law and order response
   - Inventory of PPE for smoke available to community members
   - All external resources, and assumptions concerning these
   - Public information policies and channels
   - Triage policies

2. Integration: ensuring that all parties (emergency responders, critical infrastructure operators, community organizations, education districts) are operating from the same set of assumptions and planning their responses to be consistent.

3. Expectation setting: experience shows that members of the public frequently overestimate the ability of first responders to respond to them during a disaster in a timely manner, or at all.`,
        Scale0: "Not in place: No emergency plans.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Plans",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "9.3",
        Section: "E9",
        Question: "To what extent can emergency responders access, from their own resources or via mutual aid, the equipment and personnel they need to deal with the wildfire within the required response time, and are these interoperable?",
        Tooltip: `Emergency responders need to be able to access the equipment (vehicles, earthmovers, aircraft, tools, communications, personal safety gear etc and all associated logistics) and personnel they need to respond, should the risks identified in Essential 2 come about.

These may come from their own resources, neighboring communities, other tiers of government or private sources, but overall adequacy needs to be evaluated.

There also needs to be available additional surge or back up capacity to meet with other needs that the community may have as the wildfire is being dealt with.

Emergency response in some locations has been hindered in the past by:
- Incompatible communication systems
- Incompatible equipment (even such basic items as hose-pipes from different fire services having different diameters, requiring adaptors)
- Incompatible processes

Equipment and processes or standard operating procedures need to be shown - in advance of an actual wildfire - to be interoperable as between all emergency responders.`,
        Scale0: "Not in place: Resources inadequate.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Fully Resourced",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "9.4",
        Section: "E9",
        Question: "To what extent does the community have viable plans to meet the needs of all population segments in all risk scenarios?",
        Tooltip: `Emergency plans and practices need to be evaluated for the following:

1. Evacuation demands: depend on location, road layout, access to vehicles, terrain, nature/direction of fire, and willingness of people to evacuate. Schools need particular focus.
2. Individuals' plans: all community residents need an emergency plan including: gathering family members; gathering pets, documents and key possessions; evacuation routes and meet-up points.
3. Smoke protection: community members may be seriously affected by wildfire smoke - is PPE available?
4. Shelter: communities may need schools, churches, community centers, sports centers, malls to provide emergency shelters. Shelters need to account for specific needs of men, women, children and the disabled.
5. Food and staples: Those in shelters will need access to food (including for dietary restrictions), petfood, water, spare clothes, blankets, hygiene items, toys, TV and internet.
6. Emergency fuel and transportation: Communities may need to provide emergency gasoline distribution, funds for gasoline or alternative transportation.`,
        Scale0: "Not in place: Needs not planned for.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Needs Covered",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "9.5",
        Section: "E9",
        Question: "To what extent are drills held that require all emergency responders and relevant community organizations to practice their response together, also engaging the public?",
        Tooltip: `Key aspects of the community's approach to drills that need to be evaluated:

1. Frequency: it is critical for emergency plans to be practiced regularly, and for those practices to involve all responders who need to contribute to the wildfire response.
2. Realism: practices and drills need to be based on scenarios addressing the risks identified in Essential 2. They also need to include the impact of ancillary issues such as public safety power shutoffs.
3. Learning: there also needs to be a "wash-up" after drills to evaluate what worked and what needs improving.
4. Community involvement: If possible, some drills should engage the community, especially those who live in at-risk areas, as participants - not just onlookers. This becomes a valuable form of community engagement in itself.`,
        Scale0: "Not in place: No drills conducted.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Regular & Realistic",
        AllowNA: true,
        Weight: 1,
    },

    // ===== E10: Post-Event Recovery =====
    {
        QID: "10.1",
        Section: "E10",
        Question: "To what extent are likely immediate needs anticipated and planned for?",
        Tooltip: `Post event plans should be evaluated for the extent to which they anticipate and meet the following immediate needs:

1. Survivor search, body removal: are resources available to carry this out as rapidly as possible?
2. Law & order: looting of burned or abandoned homes is a known phenomenon. Many communities have mutual aid arrangements for law & order services.
3. Debris removal:
   - Trees: felling, removal and disposal of burned trees poses major issues
   - Soot, ash and debris: pose different hazards and may be toxic
4. Emergency housing: one of the observed after-effects is the scramble for displaced people to find accommodation at reasonable rates.
5. Ground decontamination: ground can become contaminated from firefighting chemicals or chemicals released when premises or cars burn.
6. Property assessment and red-tagging: Building inspectors may face large numbers of properties to inspect.
7. Insurance processing: loss adjustment process is a frequent cause of hold-ups.
8. Pets and livestock: helping people find accommodation for pets or livestock, and dealing with injuries.
9. Price increases: local price increases in essential items and services are a known issue.

Ideally, there will be standing MOUs agreed with contractors to ensure availability and lock in pricing.`,
        Scale0: "Not in place: Immediate needs not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Plans",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.2",
        Section: "E10",
        Question: "To what extent has the need for rebooting physical infrastructure systems been anticipated and planned for?",
        Tooltip: `Critical assets, especially if above ground, will be at risk of damage from wildfires, hindering recovery. Operations or repair staff living in the area directly affected by the fire may not be available – they may be attending to their families or homes, or they may have had to evacuate.

The speed with which the relevant systems can be restored to operation will directly affect the community's recovery, and DRR plans should be evaluated for coverage of post event re-boot issues.

Physical infrastructure systems affected include:
- Communications - land-line, cellphone and internet infrastructure
- Electricity and gas
- Water supply and distribution (there may be a need for water tanker service for some months or even years after the wildfire)
- Wastewater treatment
- Roads, and other transportation if applicable`,
        Scale0: "Not in place: Infrastructure reboot not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Rapid Recovery Plans",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.3",
        Section: "E10",
        Question: "To what extent has the need for rebooting community and government systems been anticipated and planned for?",
        Tooltip: `Community and government systems will also be at risk of damage and staff displacement. Plans should be evaluated for coverage of:

1. Healthcare: the local healthcare infrastructure should be evaluated for surge capacity - burns and trauma; cardiac events; stroke; asthma; pneumonia; mental health issues. Some health issues may be long term.
2. Education: enabling children and teens to restart school will help parents focus on house repairs or return to work. If schools have been burned, emergency bussing will be required.
3. Other community systems: mail and package delivery, trash collection, leisure facilities may have the same damage and staffing issues.
4. Government systems: government services - especially welfare offices, help centers, vehicle depots, permitting, finance.
5. Permitting: will need to plan for a surge in rebuilding applications. There is tension between expediting permits and maintaining wildfire resilience standards.
6. Finance: after a wildfire, communities may face a major influx of donations that need to be accounted for. Communities should consider a back-up accounting arrangement.`,
        Scale0: "Not in place: System reboot not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / All Systems Covered",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.4",
        Section: "E10",
        Question: "To what extent has the need for rebooting the economic and commercial activity been anticipated and planned for?",
        Tooltip: `Critical assets within various commercial systems may be damaged in a wildfire, or staff may not be available, and delayed restoration will affect the recovery of the community.

The affected systems include:
1. Food supply: croplands, stock, transportation, cold storage, food-stores
2. Banking: ATMs, local offices, availability of emergency loans for businesses and property repair
3. Gasoline: supply, gas stations
4. Building supply: raw material and supply stocks, transportation, stores/outlets

In addition, the community should encourage all businesses to have viable business continuity plans (BCP) that maximize the chances of them resuming operations rapidly.

There may be additional needs for funding for displaced people until their jobs can restart, to prevent them from leaving the area, and possibly also career counselling and job training.`,
        Scale0: "Not in place: Economic recovery not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Business Continuity Plans",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.5",
        Section: "E10",
        Question: "To what extent has remediation been planned in advance for likely environmental damage?",
        Tooltip: `Wildfire damage to woodland, vegetation, habitats and other natural features or ecosystem services may well arise. Post-event plans should be evaluated for the extent to which they anticipate and allow for remediation of:

1. Water systems and resources: Lakes/reservoirs, creeks, rivers, and even near-to-the-surface ground water can be contaminated by wildfires: by ash, firefighting chemicals and also by combustion by-products from cars, buildings, and facilities. If these water resources are part of the drinking water supply, the contamination issue will be greater.
2. Vegetation: this may need to be re-established with deliberate planting if natural regeneration will not suffice. There may also be a chance to eliminate invasive species.
3. Wildlife: as above - to maintain ecological balance some species may also need to be reintroduced deliberately.`,
        Scale0: "Not in place: Environmental remediation not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Comprehensive Remediation",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.6",
        Section: "E10",
        Question: "To what extent has the risk of flash floods and mud/landslides in burn scar areas been anticipated and planned for?",
        Tooltip: `Wildfires destroy vegetation that may be holding steeper slopes together and delaying water run-off. In addition, severe fires can vitrify some soils making them impervious to water and thus exacerbating the speed of run off.

Until vegetation is reestablished the result can be either flash floods or severe mud or landslide risk.

Plans should be evaluated for the extent to which they pinpoint likely risk spots and address that risk.`,
        Scale0: "Not in place: Secondary hazards not planned.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Risk Spots Identified",
        AllowNA: true,
        Weight: 1,
    },
    {
        QID: "10.7",
        Section: "E10",
        Question: "To what extent are processes in place to learn from other communities' recovery successes and failures, and to educate other communities about your successes and failures?",
        Tooltip: `Communities can learn from each other on how to plan for post event recovery – pitfalls, strategies, methods and so on.

Do the "sister communities" of your community have different approaches to catastrophic wildfire resilience and recovery? If so what can be learned from these? What can you help them with?`,
        Scale0: "Not in place: No inter-community learning.",
        Scale1: "Minimal / Early",
        Scale2: "Developing",
        Scale3: "Functional / Coordinated",
        Scale4: "Exemplary / Active Knowledge Sharing",
        AllowNA: true,
        Weight: 1,
    },
];

export const sectionNames: Record<string, string> = {
    "E1": "E1: Governance & Strategy",
    "E2": "E2: Risk Assessment",
    "E3": "E3: Financial Planning & Insurance",
    "E4": "E4: Land Use Zoning & Building Codes",
    "E5": "E5: Nature-Based Solutions",
    "E6": "E6: Skills, Knowledge & Data",
    "E7": "E7: Community Engagement",
    "E8": "E8: Critical Infrastructure",
    "E9": "E9: Emergency Response",
    "E10": "E10: Post-Event Recovery",
};
