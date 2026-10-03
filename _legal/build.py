# -*- coding: utf-8 -*-
"""
Builds the Across the Table legal pages into /legal.

    python3 _legal/build.py

Every app gets: Terms of Service, Privacy Policy, Software License,
Disclaimer, and (only for apps that send text messages) SMS Terms.
The website itself gets its own Terms of Use and Privacy Policy.

The text lives in this one file, so a change here reaches every app.
This folder starts with an underscore, so GitHub Pages does not publish it.
"""
import html, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'legal')

CO = 'Across the Table LLC'
EMAIL = 'info@acrossthetable.biz'
ADDRESS = '101 N First Ave, Suite 2325-1495, Phoenix, AZ 85003'
EFFECTIVE = 'October 3, 2026'
SITE = 'https://acrossthetable.biz'

# --------------------------------------------------------------------------
# The apps. Shared rules come from the templates below; these fields hold
# only what is different about each app.
#   data       what the app saves for you (Privacy: "Your app data")
#   others     information about other people the app holds, if any
#   ip         what is proprietary (License and Terms)
#   advice     the one-line "not professional advice" for the Terms
#   disclaimer the full Disclaimer, as a list of (heading, text)
#   sms        True only for apps that send text messages
#   special    extra Privacy sections, as a list of (heading, text)
#   never      extra "what we never collect" items
#   paths      in-app menu paths (CreditHoy only, from Connie's documents)
# --------------------------------------------------------------------------
GENERIC_COPY = 'workflows, checklists, templates, structure, content, or system logic'
def items(lst): return ', '.join(lst)

APPS = [
  dict(slug='entrepreneur-blueprint', name='Entrepreneur Blueprint', what='a guided curriculum for building a business, from a rough idea to a business that holds together',
       data='your progress through the curriculum, answers, notes, and anything you enter into the worksheets',
       ip=['the Blueprint curriculum', 'its stage structure', 'worksheets', 'written lessons'],
       advice='The App provides business education. It is not legal, tax, accounting, or financial advice.',
       disclaimer=[
         ('Educational use only', 'Entrepreneur Blueprint is an educational tool. It is not legal, tax, accounting, or financial advice.'),
         ('No guarantee of results', 'Business results depend on your market, your effort, and many factors outside our control. We make no promise of any specific outcome, revenue, or success.'),
         ('Your responsibility', 'You are responsible for your business decisions. Consider talking with a qualified professional before making legal, tax, or financial commitments.')]),
  dict(slug='startwise', name='StartWise', what='a startup roadmap with task checklists, a business plan builder, budgeting and cost tools, and guidance on licenses and permits',
       data='your roadmap progress, tasks, business plan drafts, budgets, cost estimates, and notes',
       ip=['the StartWise roadmap', 'its phase structure', 'checklists', 'business plan templates', 'budgeting tools'],
       advice='The App provides general guidance. It is not legal, tax, accounting, or financial advice, and it does not file anything with any government agency for you.',
       disclaimer=[
         ('General guidance only', 'StartWise is an educational and organizational tool. It is not legal, tax, accounting, or financial advice.'),
         ('Licenses and permits vary', 'Licensing, permit, registration, and tax requirements differ by city, county, state, and industry, and they change. Always confirm current requirements directly with the agency responsible before you rely on them. StartWise does not file applications or registrations for you.'),
         ('Budgets are estimates', 'Budgets and cost figures are estimates based on what you enter. Your actual costs will differ.'),
         ('Your responsibility', 'You are responsible for your business decisions and for meeting the legal requirements that apply to your business.')]),
  dict(slug='ceo-mindset', name='CEO Mindset', what='a leadership framework for business owners moving from doing every job to running the business',
       data='your progress, reflections, answers, goals, and notes',
       ip=['the CEO Mindset framework', 'its structure', 'exercises', 'written content'],
       advice='The App provides leadership and business education. It is not legal, tax, accounting, financial, or mental-health advice.',
       disclaimer=[
         ('Educational use only', 'CEO Mindset is a leadership-development and educational tool. It is not legal, tax, accounting, financial, or mental-health advice, and it is not coaching tailored to your situation.'),
         ('No guarantee of results', 'Results depend on you, your business, and many factors outside our control. We make no promise of any specific outcome.'),
         ('Your responsibility', 'You are responsible for your decisions and how you run your business.')]),
  dict(slug='lohare', name='LOHARE', what='a field-service tool for quoting on site, before-and-after photos, branded invoices, and taking payment',
       data='your business profile, customers, job details, quotes, invoices, photos, and payment records',
       others=True,
       ip=['the LOHARE quoting and invoicing workflows', 'templates'],
       advice='The App helps you organize quotes, invoices, and jobs. It is not accounting or tax advice.',
       disclaimer=[
         ('A tool, not your accountant', 'LOHARE helps you create quotes and invoices and keep job records. It is not accounting, tax, or legal advice.'),
         ('Your prices and your work', 'You set your prices, taxes, and terms, and you are responsible for the accuracy of your quotes and invoices and for the work you perform. We are not a party to any agreement between you and your customers.'),
         ('Payments', 'Card and online payments are handled by third-party payment providers under their own terms. We do not hold your funds and are not responsible for a provider\'s delays, holds, or fees.'),
         ('Photos and customer information', 'You are responsible for having permission to photograph a property and to store your customers\' information.')]),
  dict(slug='brightlights-360', name='BrightLights 360', what='a project tool for sign companies, from the first sales meeting to final install',
       data='your projects, specs, renders, materials, vendor and installer details, bids, permit tracking, schedules, and payment records',
       others=True,
       ip=['the BrightLights 360 project workflows', 'templates'],
       advice='The App helps you organize sign projects. It is not engineering, legal, or permitting advice.',
       disclaimer=[
         ('A project tool, not professional advice', 'BrightLights 360 helps you organize sign projects. It is not engineering, structural, electrical, legal, or permitting advice.'),
         ('Permits and codes vary', 'Sign permits, zoning rules, and codes differ by city and county and change over time. Confirm current requirements with the responsible authority before you build or install.'),
         ('Vendors and installers', 'Vendors and installers you work with are independent businesses. We do not employ them, endorse their work, or guarantee their pricing or availability.'),
         ('Your responsibility', 'You are responsible for your projects, your contracts, and safe, lawful installation.')]),
  dict(slug='juntoshr', name='JuntosHR', what='a people tool for hiring, onboarding, scheduling, time tracking, PTO, and payroll preparation',
       data='your business profile, job posts, applicants, employee records, schedules, time entries, PTO requests, and payroll-preparation details',
       others=True, team=True,
       ip=['the JuntosHR workflows', 'onboarding and scheduling templates'],
       advice='The App helps you organize HR tasks. It is not legal, HR, tax, or payroll advice, and it does not run payroll or pay taxes for you.',
       disclaimer=[
         ('Not legal, HR, tax, or payroll advice', 'JuntosHR helps you organize hiring, scheduling, time, and payroll preparation. It is not legal, human-resources, tax, or payroll advice.'),
         ('Employment laws vary', 'Hiring, wage-and-hour, overtime, leave, and payroll-tax rules differ by state and city and change often. You are responsible for following the laws that apply to your business and your employees.'),
         ('Check the numbers', 'Hours, totals, and payroll figures are prepared from the information you enter. Review them before you pay anyone or file anything. JuntosHR does not process payroll or pay taxes on your behalf.'),
         ('Employee information', 'You are responsible for having the right to collect and store your applicants\' and employees\' information, and for keeping your own records as the law requires.')]),
  dict(slug='cash-flow-vs-ebitda', name='Cash Flow vs EBITDA', what='a financial-literacy tool that compares cash flow and EBITDA for your business side by side',
       data='the figures you enter, your comparisons, and notes',
       ip=['the Cash Flow vs EBITDA dashboards', 'comparison method', 'written lessons'],
       advice='The App provides financial education. It is not accounting, tax, investment, or financial advice.',
       disclaimer=[
         ('Educational use only', 'Cash Flow vs EBITDA is an educational tool. It is not accounting, tax, investment, or financial advice.'),
         ('Results depend on your numbers', 'Calculations are only as accurate as the figures you enter. They are not audited financial statements.'),
         ('Your responsibility', 'You are responsible for your financial decisions. Consider consulting a qualified accountant or financial professional.')]),
  dict(slug='grow-and-thrive', name='Grow & Thrive', what='a growth-planning tool for setting targets, reading ratios, and modeling what-if scenarios',
       data='your targets, figures, scenarios, plans, and notes',
       ip=['the Grow & Thrive planning models', 'ratio guides', 'written lessons'],
       advice='The App provides planning tools and business education. It is not accounting, tax, investment, or financial advice.',
       disclaimer=[
         ('Planning tools, not advice', 'Grow & Thrive is a planning and educational tool. It is not accounting, tax, investment, or financial advice.'),
         ('Projections are estimates', 'Targets, ratios, and what-if scenarios are estimates based on the figures you enter and the assumptions you choose. Actual results will differ.'),
         ('Your responsibility', 'You are responsible for your business and financial decisions.')]),
  dict(slug='tabletap', name='TableTap', what='a menu, review, and guest-loyalty tool for restaurants, opened by tapping or scanning a tag on the table',
       data='your restaurant profile, menus, specials, tag and table setup, reviews, and loyalty-program settings',
       others=True, team=True,
       ip=['the TableTap tags', 'menu and loyalty workflows', 'review flows'],
       advice='TableTap is a menu, review, and guest-loyalty tool. It is not a point-of-sale system and does not take payments for food or drink.',
       age='TableTap business accounts are only for adults 18 and older. The guest VIP and loyalty sign-up is not intended for children under 13, and we do not knowingly collect their information. If we learn we have, we will delete it.',
       special=[
         ('Restaurant guests', 'When a guest joins a restaurant\'s VIP or loyalty list through TableTap, they give their name and email address, and may choose to add a birthday and mobile number. We store this for the restaurant so it can run its loyalty program. The restaurant decides how to use it and is responsible for its own messages to guests and for following the laws that apply to them. Guests can ask the restaurant, or email us at ' + EMAIL + ', to have their information removed.'),
         ('Reviews', 'Reviews and ratings a guest leaves are shared with that restaurant.')],
       disclaimer=[
         ('What TableTap is', 'TableTap is a menu, review, and guest-loyalty tool. It is not a point-of-sale system and does not take payments for food or drink.'),
         ('Your menu and your service', 'Each restaurant is responsible for its menus, prices, allergen and dietary information, specials, and promotions, and for the food and service it provides. Guests should confirm allergen and dietary details with restaurant staff.'),
         ('Guest messages', 'Restaurants that send promotions by email or text are responsible for having their guests\' consent and for following the laws that apply, including those for marketing email and text messages.'),
         ('No guarantee of results', 'More reviews, sign-ups, or repeat visits depend on many factors outside our control. We make no promise of any specific outcome.')]),
  dict(slug='credithoy', name='CreditHoy', what='a step-by-step guide to building, monitoring, and growing business credit',
       data='your tasks, scorecard results, opened vendors, saved affirmations, and anything you enter into the trackers',
       ip=['the Blueprint methodology', 'six-phase system', 'approval scripts', 'curated vendor directory', 'affirmation library'],
       ip_terms=['the "Blueprint" framework', 'phase system', 'approval scripts', 'curated vendor directory', 'affirmations selection'],
       copy='workflows, checklists, templates, phase structure, scripts, or vendor curation',
       advice='The App provides educational information only. We are not a lender, bank, credit-repair organization, financial advisor, attorney, or accountant. We do not guarantee funding, credit approval, or any specific result.',
       no_sensitive=True,
       never=['your Social Security or tax ID number', 'bank or card account numbers', 'financial logins', 'credit reports'],
       sms=True, sms_desc='daily affirmations and reminders to complete tasks and read sections of CreditHoy',
       providers='Supabase (database and sign-in), Netlify (app hosting), Stan (checkout and billing), Zapier (connecting your purchase to your account), and Resend (sending password-reset emails). If you opt in to texts, a messaging provider delivers them.',
       two_step=True,
       paths=dict(download='More → Your data & privacy → Download my data', delete='More → Your account → Delete my account'),
       disclaimer=[
         ('Educational use only', 'CreditHoy is an educational and organizational tool. It is not financial, legal, tax, or accounting advice.'),
         ('Not a lender or credit-repair service', 'Across the Table LLC is not a bank, lender, broker, financial institution, or credit-repair organization. We do not issue credit, guarantee approval, or repair credit on your behalf.'),
         ('No guarantee of results', 'Funding, credit limits, and approvals are decided solely by third-party vendors, banks, and bureaus. Results depend on your business profile, effort, and many factors outside our control. We make no promise of any specific outcome, including the "$50K" figure, which is illustrative.'),
         ('Do your own due diligence', 'Vendor names, links, and bureau reporting can change. Verify current terms directly with each vendor before applying. We may have no affiliation with the vendors listed.'),
         ('Your responsibility', 'You are responsible for your business and financial decisions. Consider consulting a qualified professional before taking on credit or debt.')]),
  dict(slug='business-connect', name='Business Connect', what='a digital business card with a QR code, two-way contact exchange, notes, follow-up reminders, and pipeline tracking',
       data='your card details, the contacts you exchange or add, notes, tags, reminders, and pipeline stages',
       others=True,
       ip=['the Business Connect card designs', 'exchange and pipeline workflows'],
       advice='The App helps you exchange contact details and follow up. It is not legal or marketing-compliance advice.',
       disclaimer=[
         ('Your contacts, your responsibility', 'When you save or follow up with a contact, you are responsible for doing so lawfully, including the rules for marketing email and text messages, and for honoring requests to stop.'),
         ('Shared details', 'When you share your card or exchange details with someone, they receive the information on your card. Only share what you are comfortable with them having.'),
         ('No guarantee of results', 'Leads and sales depend on many factors outside our control. We make no promise of any specific outcome.')]),
  dict(slug='leadmatch', name='LeadMatch', what='a prospecting tool that finds and scores potential customers and helps you reach out',
       data='your search criteria, saved prospects, scores, notes, and outreach history',
       others=True,
       ip=['the LeadMatch scoring logic', 'matching criteria', 'outreach templates'],
       advice='The App helps you find and contact prospects. It is not legal or marketing-compliance advice.',
       disclaimer=[
         ('Prospect information may be incomplete', 'Prospect details come from public and third-party sources and may be out of date or inaccurate. Verify important details before you rely on them.'),
         ('Lawful outreach is your responsibility', 'You are responsible for how you contact prospects, including the laws for marketing email and text messages, honoring opt-out requests, and following the terms of any platform you use, such as LinkedIn.'),
         ('Scores are guidance', 'Fit scores are estimates to help you prioritize. They are not a guarantee that a prospect will buy.'),
         ('No guarantee of results', 'Responses and sales depend on many factors outside our control. We make no promise of any specific outcome.')]),
  dict(slug='hearaboutit', name='HearAboutIt', what='a content tool that writes social posts for Facebook, Instagram, LinkedIn, TikTok, and YouTube from one topic',
       data='your topics, brand details, drafts, approved posts, schedules, and connected-account settings',
       ip=['the HearAboutIt content workflows', 'prompts', 'templates'],
       advice='The App drafts content for you to review. It is not legal or marketing-compliance advice.',
       special=[('Connected social accounts', 'If you connect a social media account so HearAboutIt can post or schedule for you, we use that connection only to do what you approve. You can disconnect it at any time.')],
       disclaimer=[
         ('Drafts made with AI', 'Posts are drafted with the help of artificial intelligence and can contain mistakes, outdated facts, or wording that does not fit your brand. Review every post before you approve it.'),
         ('You are the publisher', 'You decide what is posted and are responsible for it, including its accuracy, any claims it makes, and having the rights to any images, music, or other material you add.'),
         ('Platform rules', 'Each social platform has its own rules. You are responsible for following them. We are not responsible if a platform removes content or limits an account.'),
         ('No guarantee of results', 'Reach, engagement, and sales depend on many factors outside our control.')]),
  dict(slug='refer-and-earn', name='Refer & Earn', what='a referral program tool with personal referral links and QR codes, commission tracking, leaderboards, and an earnings wallet',
       data='your program settings, referral links and codes, referrals, commission records, and payout records',
       others=True, team=True,
       ip=['the Refer & Earn tracking logic', 'program templates'],
       advice='The App tracks referrals and commissions. It is not legal, tax, or accounting advice.',
       disclaimer=[
         ('Tracking, not a payment guarantee', 'Refer & Earn tracks referrals and commissions. The business running a referral program sets its own rules and commission amounts and is responsible for paying them. We do not guarantee any payout.'),
         ('Taxes', 'Commissions may be taxable. Businesses and participants are responsible for their own tax reporting.'),
         ('Program rules', 'Businesses are responsible for running their programs fairly and lawfully, including any disclosures referrers must make when they recommend a business.')]),
]

# --------------------------------------------------------------------------
# Page building blocks
# --------------------------------------------------------------------------
def e(t): return html.escape(t, quote=False).replace('→', '&rarr;')
def mail(): return '<a href="mailto:%s">%s</a>' % (EMAIL, EMAIL)
def linkify(t):
    t = e(t)
    return t.replace(EMAIL, mail())

def P(t):            return '<p>%s</p>' % linkify(t)
def LEAD(label, t):  return '<p><strong>%s.</strong> %s</p>' % (e(label), linkify(t))
def H(t):            return '<h2>%s</h2>' % e(t)
def UL(items):       return '<ul>%s</ul>' % ''.join('<li>%s</li>' % linkify(i) for i in items)
def ULB(items):      return '<ul>%s</ul>' % ''.join('<li><strong>%s</strong> — %s</li>' % (e(a), linkify(b)) for a, b in items)

TRIAL = [
  'Some memberships begin with a free trial. When a free trial is offered, the length is shown on the App\'s page and at checkout (currently 14 days), and it applies to monthly and annual memberships only.',
  'To start a trial, you enter a payment method at checkout with our checkout partner, Stan. You are not charged during the trial.',
  'Unless you cancel before the trial ends, your paid membership begins automatically when the trial ends. The payment method you gave at checkout is then charged the plan price shown at checkout, and charged again each month or each year, depending on your plan, until you cancel.',
  'To avoid being charged, cancel before your trial ends. You can cancel by emailing ' + EMAIL + ', or through Stan where that option is available to you. Please allow one business day for an email request.',
  'One-time purchases do not include a trial and are charged in full at checkout.',
]

def terms_blocks(a):
    n = a['name']
    b = [P('Welcome to %s by %s ("we," "us," "Company"). By accessing or using this application (the "App"), you ("you," "User") agree to these Terms of Service. If you do not agree, do not use the App.' % (n, CO)),
         LEAD('Eligibility', 'You must be at least 18 years old and able to enter into a binding agreement to use the App. By creating an account, you confirm that you meet these requirements.'),
         H('Purchases, free trial & membership')]
    b += [P(t) for t in TRIAL]
    b += [P('Membership pricing, billing, renewal, and refunds are handled at checkout under the terms shown there. You may cancel at any time; cancelling stops future charges, and access continues until the end of the period you have already paid for. When a membership ends, access to the App ends, and your saved data is kept as described in the Privacy Policy so you can pick up where you left off if you rejoin.')]
    b += [H('1. License to use'),
          P('We grant you a personal, limited, non-exclusive, non-transferable, revocable license to use the App for your own business purposes. You receive no ownership rights of any kind.'),
          H('2. What you may not do'),
          UL(['You may not reverse engineer, decompile, disassemble, or attempt to derive the source code or underlying logic of the App.',
              'You may not copy, reproduce, scrape, or replicate our %s.' % a.get('copy', GENERIC_COPY),
              'You may not resell, sublicense, rent, redistribute, or replicate the system or any part of its logic, in whole or in part.',
              'You may not remove or alter any copyright, trademark, watermark, or proprietary notice.',
              'You may not use the App to build, train, or inform a competing product or service.']),
          H('3. Our intellectual property'),
          P('The App, its content, design, methodology, %s, and all related materials are the exclusive property of %s and are protected by copyright, trademark, and trade-secret law.' % (items(a.get('ip_terms') or a['ip']), CO)),
          H('4. Educational purpose & no guarantee'),
          P(a['advice'] + ' See the Disclaimer for details.'),
          H('5. Accounts & conduct')]
    conduct = 'You agree to provide accurate information and to use the App lawfully. You are responsible for keeping your password safe and for activity under your account and any third-party accounts you open.'
    if a.get('no_sensitive'):
        conduct += ' Do not enter Social Security numbers, account numbers, or passwords into the App.'
    b.append(P(conduct))
    if a.get('others'):
        b.append(P('If you add information about other people to the App, such as customers, contacts, employees, or guests, you confirm that you have the right to do so and that you will use it lawfully.'))
    b += [H('6. Termination'),
          P('You may delete your account at any time from within the App, or by emailing %s. We may suspend or terminate your access for violation of these Terms. Sections on intellectual property, disclaimers, and liability survive termination.' % EMAIL),
          H('7. Limitation of liability'),
          P('To the maximum extent permitted by law, the App is provided "as is" without warranties of any kind. %s is not liable for any indirect, incidental, or consequential damages, or for any decisions you make based on the App.' % CO),
          H('8. Governing law & changes'),
          P('These Terms are governed by the laws of the State of Arizona. If we make important changes, we will notify you in the App and ask you to agree again before continuing. Questions? %s.' % EMAIL)]
    return b

def privacy_blocks(a):
    n = a['name']
    only_you = 'only you can see it' if not a.get('team') else 'only you and the people you give access to can see it'
    b = [P('This Privacy Policy explains what %s ("we," "us") collects when you use the %s app, how we use it, and the choices you have. The short version: your data is yours, %s, and we never sell it.' % (CO, n, only_you)),
         H('Information we collect')]
    items = [('Account information', 'your email address and password. Passwords are encrypted; we cannot see them.'),
             ('Agreement record', 'the date and version of the Terms and Privacy Policy you agreed to, and your confirmation that you are 18 or older.'),
             ('Your app data', a['data'] + '.')]
    if a.get('others'):
        items.append(('Information about other people', 'details you choose to add about others, such as customers, contacts, employees, or guests. We process it only to provide the App to you.'))
    if a.get('sms'):
        items.append(('Mobile number', 'only if you opt in to SMS reminders, along with the date you consented.'))
    items += [('Membership status', 'your email, plan name, and whether your membership or trial is active, received from our checkout partner when you subscribe.'),
              ('Basic technical logs', 'our hosting and database providers keep standard security logs (such as IP address and time of request) to keep the service running and safe.')]
    b.append(ULB(items))
    never = a.get('never')
    if never:
        b.append(LEAD('What we never collect', 'We never ask for %s. Payments are processed by our checkout partner; we never see your card details. Please do not enter sensitive numbers into the app\'s trackers or notes.' % (', '.join(never[:-1]) + ', or ' + never[-1])))
    else:
        b.append(LEAD('Payment details', 'Payments are processed by our checkout partner, Stan. We never see your card details.'))
    for head, text in a.get('special', []):
        b.append(LEAD(head, text))
    uses = 'To run your account, save and sync your data, provide your free trial and membership, '
    if a.get('sms'): uses += 'send reminders you opt into, '
    uses += 'answer support requests, keep the App secure, and meet legal obligations. We do not use advertising trackers, and we do not sell or rent your personal information.'
    b.append(LEAD('How we use it', uses))
    who = 'Only you. Each account can access only its own data.' if not a.get('team') else 'Only you and the people you give access to in the App. Each business account can access only its own data.'
    b.append(LEAD('Who can see your data', who + ' %s views account data only to help you when you ask, to protect the service, or when required by law.' % CO))
    prov = a.get('providers') or 'Supabase (database and sign-in), Stan (checkout and billing), Zapier (connecting your purchase to your account), and our app hosting and email providers.'
    b.append(LEAD('Service providers', 'We use trusted providers, under contract, to operate %s: %s These providers may process data in the United States.' % (n, prov)))
    if a.get('sms'):
        b.append(LEAD('SMS / text messaging', 'If you opt in, your number is used solely to send Across the Table reminders and affirmations. We do not sell, rent, or share your mobile number or SMS consent with third parties or affiliates for their marketing. Reply STOP anytime to opt out. See the SMS Terms.'))
    b += [H('Retention'),
          UL(['We keep your data while your account is open.',
              'If your trial or membership is cancelled and you don\'t sign in for 12 months, we may delete the account.',
              'When you delete your account, your account and data are removed right away; backup copies expire within 30 days.',
              'We may keep limited purchase records (email, plan, dates) as required for billing, tax, and legal purposes.'])]
    sec = ('Data is encrypted in transit and at rest, each account is isolated from every other account, and administrative accounts use two-step sign-in.'
           if a.get('two_step') else 'Data is encrypted in transit and at rest, and each account is isolated from every other account.')
    sec += ' No method of storage or transmission is 100% secure, but we work to protect your information and will notify you as required by law if a breach affects you.'
    b.append(LEAD('Security', sec))
    b.append(H('Your rights & choices'))
    paths = a.get('paths')
    if paths:
        rights = ['See and download your data anytime in the app: %s.' % paths['download'],
                  'Delete your account and data anytime in the app (%s), or email %s.' % (paths['delete'], EMAIL)]
    else:
        rights = ['Ask for a copy of your data, or for your account and data to be deleted, by emailing %s. Where the App offers download or delete options in its settings, you can use those too.' % EMAIL]
    rights += ['Correct your information or ask any privacy question by emailing %s. We respond within 30 days.' % EMAIL,
               'Depending on where you live (for example, California), you may have additional rights. We honor them, and we will not treat you differently for using them.']
    b.append(UL(rights))
    age = a.get('age') or ('%s is only for adults 18 and older. We do not knowingly collect information from anyone under 18. If we learn we have, we will delete it.' % n)
    b += [LEAD('Age requirement', age),
          LEAD('Changes to this policy', 'If we make important changes, we will let you know in the App and ask you to review and agree again before continuing.'),
          LEAD('Contact', '%s · %s · %s' % (CO, ADDRESS, EMAIL))]
    return b

def license_blocks(a):
    n = a['name']
    return [P('This Software License Agreement governs your use of the %s software and content. It protects the original system created by %s.' % (n, CO)),
            LEAD('Ownership', 'All rights, title, and interest in the App — including its source code, design, %s, copy, and visual identity — are and remain the exclusive property of %s.' % (items(a['ip']), CO)),
            LEAD('Limited license', 'You are granted a revocable, non-exclusive, non-transferable license to use the App for your own business use only. No other rights are granted by implication.'),
            H('Prohibited conduct'),
            UL(['Reverse engineering, decompiling, or disassembling the App.',
                'Copying or replicating workflows, templates, structure, or system logic.',
                'Reselling, sublicensing, white-labeling, or redistributing the App or its content.',
                'Extracting content to create a competing or derivative product.',
                'Removing watermarks, attribution, or proprietary notices.']),
            LEAD('Proprietary protection', 'Our methodology and content are protected as trade secrets and original works of authorship.'),
            LEAD('Enforcement & DMCA', 'Unauthorized use is a material breach and may result in termination, injunctive relief, and damages. To report infringement, contact %s.' % EMAIL),
            LEAD('Trademark', '"Across the Table" and the %s name and logo are trademarks of %s.' % (n, CO))]

def sms_blocks(a):
    return [P('These terms govern the Across the Table reminder text-message program for %s. They are written to align with TCPA and carrier (A2P 10DLC) requirements.' % a['name']),
            LEAD('Program description', 'When you opt in, you will receive recurring automated text messages containing %s.' % a['sms_desc']),
            LEAD('Consent', 'By providing your number and checking the consent box, you give express written consent to receive these messages. Consent is not a condition of purchasing any goods or services.'),
            LEAD('Message frequency & cost', 'Message frequency varies (typically up to one message per day). Message and data rates may apply per your mobile plan.'),
            LEAD('Opt-out & help', 'Reply STOP at any time to cancel. You will receive one confirmation and no further messages. Reply HELP for assistance, or email %s.' % EMAIL),
            LEAD('Carriers & eligibility', 'Supported carriers are not liable for delayed or undelivered messages. You must be the account holder or have authorization for the number, and be 18 or older.'),
            LEAD('Privacy', 'We do not sell or share your number or consent for third-party marketing. See the Privacy Policy.')]

def disclaimer_blocks(a):
    return [LEAD(h, t) for h, t in a['disclaimer']]

# ---- the website itself ----
def site_terms_blocks():
    return [P('These Terms of Use apply to the Across the Table website at acrossthetable.biz (the "Site"), run by %s ("we," "us"). By using the Site, you agree to them. Each app has its own Terms of Service, Privacy Policy, and other policies, listed on our Legal page; those apply when you buy or use that app.' % CO),
            LEAD('Who may use the Site', 'You may browse the Site at any age. Purchases are for adults 18 and older.'),
            LEAD('Our content', 'The Site\'s text, designs, frameworks, workbooks, videos, app descriptions, and logos belong to %s and are protected by copyright and trademark law. You may view and share links to the Site, but you may not copy, resell, or republish our content without written permission.' % CO),
            LEAD('Educational information, not advice', 'Information on the Site, including the AI Assessment and its recommendations, is general business education. It is not legal, tax, accounting, or financial advice, and it is not a guarantee of any result.'),
            LEAD('Purchases', 'Apps, workbooks, programs, and other products are sold through our checkout partner, Stan. Prices, billing, free trials, renewals, and refunds are shown at checkout and in the Terms for that product. Prices and availability on the Site can change, and we may correct mistakes.'),
            LEAD('Free trials', 'When a free trial is offered, you enter a payment method at checkout and are not charged during the trial. Unless you cancel before the trial ends, your membership begins and you are charged automatically. The full details are in each app\'s Terms of Service.'),
            LEAD('Links to other sites', 'The Site links to other websites and services, such as Stan, YouTube, Google Play, and the tools recommended in the AI Assessment. We are not responsible for their content, products, or policies.'),
            LEAD('Using the Site fairly', 'Do not try to break into, overload, or interfere with the Site, or scrape or copy it in bulk.'),
            LEAD('No warranties; limitation of liability', 'The Site is provided "as is." To the maximum extent permitted by law, %s is not liable for any indirect, incidental, or consequential damages arising from your use of the Site.' % CO),
            LEAD('Governing law & changes', 'These Terms are governed by the laws of the State of Arizona. We may update them; the date above shows when they last changed.'),
            LEAD('Contact', '%s · %s · %s' % (CO, ADDRESS, EMAIL))]

def site_privacy_blocks():
    return [P('This Privacy Policy explains what %s ("we," "us") collects through the Across the Table website at acrossthetable.biz (the "Site"). Each app has its own Privacy Policy, listed on our Legal page. The short version: we collect very little, we do not track you for advertising, and we never sell your information.' % CO),
            H('Information we collect'),
            ULB([('When you contact us or join a waiting list', 'your name, email address, and your message. These are sent by your own email app, or through a form service we use to receive them.'),
                 ('When you report an issue', 'the app, the type and urgency of the problem, your description, your name, and your email address, so we can reply.'),
                 ('When you buy something', 'purchases happen on Stan, our checkout partner. Stan collects your payment details under its own privacy policy; we receive your name, email, and what you bought so we can give you access.'),
                 ('Basic technical information', 'the Site is hosted on GitHub Pages, and its fonts are provided by Google Fonts. Like any website, these providers receive your IP address and browser details when you load a page, and may keep them in their logs.')]),
            LEAD('The AI Assessment', 'The AI Assessment runs in your browser. Your answers are not sent to us.'),
            LEAD('Cookies and browser storage', 'We do not use advertising or analytics cookies. The Site may save a few settings in your own browser\'s local storage so it works smoothly; that information stays on your device.'),
            LEAD('How we use information', 'To answer you, provide what you bought, fix problems you report, keep the Site secure, and meet legal obligations. We do not sell or rent your personal information, and we do not use it for advertising.'),
            LEAD('Who we share it with', 'Only the providers that help run the Site and our sales — GitHub (hosting), Google Fonts (fonts), Stan (checkout), and our email and form providers — and authorities when the law requires it.'),
            LEAD('Retention', 'We keep messages and support requests as long as needed to help you and for our records, and purchase records as required for billing, tax, and legal purposes.'),
            LEAD('Your choices', 'Ask for a copy of your information, or for it to be corrected or deleted, by emailing %s. We respond within 30 days. Depending on where you live (for example, California), you may have additional rights, and we will not treat you differently for using them.' % EMAIL),
            LEAD('Children', 'The Site is not directed to children under 13, and we do not knowingly collect their information.'),
            LEAD('Changes', 'We may update this policy; the date above shows when it last changed.'),
            LEAD('Contact', '%s · %s · %s' % (CO, ADDRESS, EMAIL))]

# --------------------------------------------------------------------------
# HTML
# --------------------------------------------------------------------------
CSS = r'''
:root{--bg:#06111d;--panel:#0d1b2c;--line:rgba(120,170,220,.16);--text:#c9d9e8;--muted:#93a7bd;--head:#eaf4ff;
  --teal:#27d8c2;--gold:#e0a03a;--link:#8fd0ff;}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 'Hanken Grotesk',system-ui,-apple-system,'Segoe UI',sans-serif;
  background-image:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(39,216,194,.08),transparent 70%);background-repeat:no-repeat}
a{color:var(--link);text-underline-offset:3px}
a:hover{color:#fff}
.top{border-bottom:1px solid var(--line);background:rgba(6,17,29,.9);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
.top-in{max-width:1000px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:10px;color:var(--head);text-decoration:none;font:700 16px 'Schibsted Grotesk',sans-serif}
.brand i{width:22px;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--link),var(--gold));display:inline-block}
.top a.back{font-size:14px;color:var(--muted);text-decoration:none;white-space:nowrap}
.top a.back:hover{color:var(--head)}
main{max-width:1000px;margin:0 auto;padding:30px 20px 60px}
.crumb{font:500 11px 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);margin:0 0 10px}
.crumb a{color:var(--teal);text-decoration:none}
h1{font:800 clamp(28px,4.4vw,40px)/1.15 'Schibsted Grotesk',sans-serif;color:var(--head);margin:0 0 8px;letter-spacing:-.01em}
.eff{font:500 12px 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.06em;color:var(--muted);margin:0 0 24px}
nav.tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 26px}
nav.tabs a{font-size:14px;text-decoration:none;color:var(--text);border:1px solid var(--line);border-radius:999px;padding:7px 14px;background:var(--panel)}
nav.tabs a[aria-current]{color:#06111d;background:var(--teal);border-color:var(--teal);font-weight:700}
nav.tabs a:hover{border-color:rgba(39,216,194,.5)}
article{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:clamp(20px,4vw,38px);max-width:820px}
article h2{font:700 19px 'Schibsted Grotesk',sans-serif;color:var(--head);margin:28px 0 8px}
article h2:first-child{margin-top:0}
article p{margin:0 0 14px}
article strong{color:var(--head)}
article ul{margin:0 0 16px;padding-left:22px}
article li{margin:0 0 7px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:8px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px}
.card h2{font:700 17px 'Schibsted Grotesk',sans-serif;color:var(--head);margin:0 0 4px}
.card p{margin:0 0 10px;font-size:14px;color:var(--muted);line-height:1.5}
.card ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px 14px;font-size:14px}
.sec{font:500 11px 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:34px 0 12px}
.lede{max-width:700px;color:var(--text);margin:0 0 6px}
footer{border-top:1px solid var(--line);margin-top:40px}
footer div{max-width:1000px;margin:0 auto;padding:20px;font-size:13px;color:var(--muted)}
@media print{body{background:#fff;color:#000}.top,nav.tabs,footer{display:none}article{border:0;padding:0;background:#fff}
  article h2,article strong,h1{color:#000}a{color:#000}}
'''

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=IBM+Plex+Mono:wght@500&family=Schibsted+Grotesk:wght@700;800&display=swap" rel="stylesheet">'

def page(title, desc, crumb, h1, body, depth, tabs=''):
    up = '../' * depth
    return '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="robots" content="index,follow">
%(fonts)s
<style>%(css)s</style>
</head>
<body>
<header class="top"><div class="top-in">
  <a class="brand" href="%(up)sindex.html"><i aria-hidden="true"></i>Across the Table</a>
  <a class="back" href="%(up)sindex.html">&larr; Back to the website</a>
</div></header>
<main>
  <p class="crumb">%(crumb)s</p>
  <h1>%(h1)s</h1>
  <p class="eff">Effective %(eff)s · %(co)s</p>
  %(tabs)s
  %(body)s
</main>
<footer><div>%(co)s · %(addr)s · <a href="mailto:%(email)s">%(email)s</a> · <a href="%(up)slegal/index.html">All legal documents</a></div></footer>
</body>
</html>
''' % dict(title=e(title), desc=e(desc), fonts=FONTS, css=CSS, up=up, crumb=crumb, h1=e(h1), eff=EFFECTIVE,
           co=e(CO), addr=e(ADDRESS), email=EMAIL, tabs=tabs, body=body)

DOCS = [('terms', 'Terms of Service', terms_blocks), ('privacy', 'Privacy Policy', privacy_blocks),
        ('license', 'Software License', license_blocks), ('sms', 'SMS Terms', sms_blocks),
        ('disclaimer', 'Disclaimer', disclaimer_blocks)]

def docs_for(a):
    return [d for d in DOCS if d[0] != 'sms' or a.get('sms')]

def write(path, text):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f: f.write(text)

def build():
    if os.path.isdir(OUT):
        for dp, dn, fn in os.walk(OUT, topdown=False):
            for f in fn: os.remove(os.path.join(dp, f))
            for d in dn: os.rmdir(os.path.join(dp, d))
    count = 0
    for a in APPS:
        docs = docs_for(a)
        for key, label, fn in docs:
            tabs = '<nav class="tabs" aria-label="%s legal documents">%s</nav>' % (e(a['name']), ''.join(
                '<a href="%s.html"%s>%s</a>' % (k, ' aria-current="page"' if k == key else '', e(l)) for k, l, _ in docs))
            body = '<article>%s</article>' % ''.join(fn(a))
            crumb = '<a href="../index.html">Legal</a> · %s' % e(a['name'])
            write('%s/%s.html' % (a['slug'], key),
                  page('%s %s · Across the Table' % (a['name'], label), '%s %s from %s.' % (a['name'], label, CO), crumb, label, body, 2, tabs))
            count += 1
        # the app folder's own address shows its list of documents
        links = ''.join('<li><a href="%s.html">%s</a></li>' % (k, e(l)) for k, l, _ in docs)
        write('%s/index.html' % a['slug'], page('%s legal documents · Across the Table' % a['name'], 'Legal documents for %s.' % a['name'],
              '<a href="../index.html">Legal</a> · %s' % e(a['name']), '%s legal documents' % a['name'],
              '<article><p>%s is %s.</p><ul>%s</ul></article>' % (e(a['name']), e(a['what']), links), 2))
    # website policies
    site_tabs = lambda cur: '<nav class="tabs" aria-label="Website policies">%s</nav>' % ''.join(
        '<a href="%s.html"%s>%s</a>' % (k, ' aria-current="page"' if k == cur else '', l) for k, l in [('terms', 'Website Terms of Use'), ('privacy', 'Website Privacy Policy')])
    write('terms.html', page('Website Terms of Use · Across the Table', 'Terms of use for acrossthetable.biz.',
          '<a href="index.html">Legal</a> · Website', 'Website Terms of Use', '<article>%s</article>' % ''.join(site_terms_blocks()), 1, site_tabs('terms')))
    write('privacy.html', page('Website Privacy Policy · Across the Table', 'Privacy policy for acrossthetable.biz.',
          '<a href="index.html">Legal</a> · Website', 'Website Privacy Policy', '<article>%s</article>' % ''.join(site_privacy_blocks()), 1, site_tabs('privacy')))
    # the legal home
    cards = ''.join('<div class="card"><h2>%s</h2><p>%s</p><ul>%s</ul></div>' % (
        e(a['name']), e(a['what'][0].upper() + a['what'][1:]) + '.',
        ''.join('<li><a href="%s/%s.html">%s</a></li>' % (a['slug'], k, e(l)) for k, l, _ in docs_for(a))) for a in sorted(APPS, key=lambda x: x['name'].lower()))
    home = ('<p class="lede">The policies for the Across the Table website, and the terms and policies for each app. '
            'Questions about any of them? Email %s.</p>' % mail() +
            '<p class="sec">The website</p><div class="grid"><div class="card"><h2>acrossthetable.biz</h2><p>Browsing the site, the AI Assessment, sign-ups, and purchases.</p>'
            '<ul><li><a href="terms.html">Terms of Use</a></li><li><a href="privacy.html">Privacy Policy</a></li></ul></div></div>'
            '<p class="sec">The apps</p><div class="grid">%s</div>' % cards)
    write('index.html', page('Legal · Across the Table', 'Terms, privacy, and other policies for Across the Table and its apps.',
          'Legal', 'Terms & policies', home, 1))
    return count

if __name__ == '__main__':
    n = build()
    print('built %d app documents for %d apps, plus website Terms, Privacy and the Legal home' % (n, len(APPS)))
