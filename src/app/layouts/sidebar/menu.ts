import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        icon: 'bx-home-circle',
        link:'/dashboard'
        
    },
    {
        id: 3,
        isLayout: true
    },
    {
        id: 4,
        label: 'MENUITEMS.USERMANAGEMENT.TEXT',
        isTitle: true
    },
    {
        id: 5,
        label: 'MENUITEMS.EMPLOYEES.TEXT',
        icon: 'bxs-user-pin',
       // icon: 'bxs-user-detail',
        subItems: [
            {
                id: 6,
                label: 'MENUITEMS.EMPLOYEES.LIST.EMPLOYEESLIST',
                link: '/employees/list',
                parentId: 5
            },
           
            {
                id: 7,
                label: 'MENUITEMS.EMPLOYEES.LIST.ROLESETUP',
                link: '/employees/list',
                parentId: 5
            }
                ],
    },
    {
        id: 8,
        label: 'MENUITEMS.CUSTOMERS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 9,
                label: 'MENUITEMS.CUSTOMERS.LIST.CUSTOMERSLIST',
                link: '/employees/list',
                parentId: 8
            },
            {
                id: 10,
                label: 'MENUITEMS.CUSTOMERS.LIST.ABANDONEDTASKS',
                link: '/employees/list',
                parentId: 8
            },
            {
                id: 11,
                label: 'MENUITEMS.CUSTOMERS.LIST.CUSTOMERSREVIEWS',
                link: '/contacts/profile',
                parentId: 8,
                
            }
        ]
    },
    {
        id: 12,
        label: 'MENUITEMS.MERCHANTSMANAGEMENT.TEXT',
        isTitle: true
    },
    {
        id: 13,
        label: 'MENUITEMS.MERCHANTSLIST.TEXT',
        link: '/merchants/list',
        icon: 'bx bx-store',
        
    },
    {  id: 14,
        label: 'MENUITEMS.COMMISSION.TEXT',
        icon: 'bx bx-dollar-circle',
        link: '/contacts/grid',
        
    },
    {  id: 15,
        label: 'MENUITEMS.OFFERS.TEXT',
        icon:  'bx bxs-offer',
        link: '/contacts/grid',
        
    },
    {
        id: 16,
        label: 'MENUITEMS.DEPARTMENTMANAGEMENT.TEXT',
        isTitle: true
    }, 
    {
        id: 17,
        label: 'MENUITEMS.DEPARTMENTLIST.TEXT',
        icon: 'bx bx-building-house',
        link: '/contacts/grid',
    },          
    {
        id: 18,
        label: 'MENUITEMS.WALLETMANAGEMENT.TEXT',
        isTitle: true
    }, 
    {
        id: 19,
        label: 'MENUITEMS.MERCHANTWALLET.TEXT',
        icon: 'bx bx-wallet-alt',
        link: '/contacts/grid',
    }, 
    {
        id: 20,
        label: 'MENUITEMS.CUSTOMERWALLET.TEXT',
        icon: 'bx bx-wallet',
        link: '/contacts/grid',
    }, 
    {
        id: 25,
        label: 'MENUITEMS.PRODUCTMANAGEMENT.TEXT',
        isTitle: true
    },
    {
        id: 26,
        label: 'MENUITEMS.SUBSCRIPTION.TEXT',
        icon:  'bx bx-bell',
        link: '/contacts/list'
    },
    {
        id: 27,
        label: 'MENUITEMS.COMPANYSUBSCRIPTION.TEXT',
        icon: 'bx bxs-report',
        link: '/contacts/list'
    },
    {
        id: 16,
        label: 'MENUITEMS.COUPONMANAGEMENT.TEXT',
        icon: 'bx bxs-coupon',
        subItems: [
            {
                id: 17,
                label: 'MENUITEMS.COUPONMANAGEMENT.LIST.COUPON',
                link: '/invoices/list',
                parentId: 16
            },
            {
                id: 18,
                label: 'MENUITEMS.COUPONMANAGEMENT.LIST.FLASHDEALS',
                link: '/invoices/detail',
                parentId: 16
            },
            {
                id: 19,
                label: 'MENUITEMS.COUPONMANAGEMENT.LIST.DEALOFTHEDAY',
                link: '/invoices/detail',
                parentId: 16
            }
        ]
    },
    {
        id: 28,
        label: 'MENUITEMS.PREPRINTEDMEMBERSHIP.TEXT',
        icon: 'bx bxs-user-badge',
        link: '/blog/grid'
    },
    {
        id: 29,
        label: 'MENUITEMS.GIFTS.TEXT',
        icon: 'bx bxs-gift',
        link: '/blog/grid'
    },
    {
        id: 30,
        label: 'MENUITEMS.MARKETINGMANAGEMENT.TEXT',
        icon: 'bx-receipt',
        isTitle: true
    },
    {
        id: 31,
        label: 'MENUITEMS.MARKETINGCOMPAIGNS.TEXT',
        icon: 'bx bxs-megaphone',
        link: '/blog/list'
        
        
    },
    {
        id: 32,
        label: 'MENUITEMS.MARKETINGOFFERS.TEXT',
        icon: 'bx bxs-discount',
        link: '/blog/list'
        
        
    },
    {
        id: 33,
        label: 'MENUITEMS.SPECIALCOUPONS.TEXT',
        icon: 'bx bxs-discount',
        link: '/blog/list'
               
    },
    {
        id: 34,
        label: 'MENUITEMS.SYSTEMLADMINISTRATION.TEXT',
        isTitle:true
               
    },
    {
        id: 35,
        label: 'MENUITEMS.BANKS.TEXT',
        icon: 'bx bxs-bank',
        link: '/blog/list'
               
    },
    {
        id: 36,
        label: 'MENUITEMS.TAXSETTINGS.TEXT',
        icon:  'bx bxs-dollar-circle',
        link: '/blog/list'
               
    },
    {
        id: 37,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx bxs-report',
        link: '/blog/list'
               
    },
    {
        id: 38,
        label: 'MENUITEMS.CURRENCIES.TEXT',
        icon: 'bx bx-money',
        link: '/blog/list'
               
    },
    {
        id: 39,
        label: 'MENUITEMS.COUNTRIES.TEXT',
        icon: 'bx bx-globe',
        link: '/blog/list'
               
    },
    {
        id: 40,
        label: 'MENUITEMS.CITIES.TEXT',
        icon: 'bx bxs-city',
        link: '/blog/list'
               
    },
    {
        id: 41,
        label: 'MENUITEMS.NOTIFICATIONMANAGEMENT.TEXT',
        isTitle: true
          
    },
    {
        id: 40,
        label: 'MENUITEMS.APPNOTIFICATION.TEXT',
        icon: 'bx bxs-bell-ring',
        link: '/blog/list'
        
          
    },
    
    {
        id: 42,
        label: 'MENUITEMS.SOCIALMEDIASET.TEXT',
        icon:  'bx bxl-facebook-circle',
        link: '/blog/list'
                
    },
   
    {
        id: 44,
        label: 'MENUITEMS.FINANCIALMANAGEMENT.TEXT',
        isTitle: true
                
    },
    {
        id: 45,
        label: 'MENUITEMS.TAX.TEXT',
        icon: 'bx bxs-dollar-circle',
        link: '/blog/list'
                
    },
    {
        id: 46,
        label: 'MENUITEMS.CUSTOMERINVOICES.TEXT',
        icon:  'bx bxs-report',
        link: '/blog/list'
                
    },
    {
        id: 47,
        label: 'MENUITEMS.PAYMENTS.TEXT',
        icon: 'bx bxl-paypal',
        link: '/blog/list'
                
    },
    {
        id: 43,
        label: 'MENUITEMS.CONTRACTSANDFOLLOWUPS.TEXT',
        isTitle: true
                
    },
    {
        id: 48,
        label: 'MENUITEMS.MISSIONS.TEXT',
        icon: 'bx bxs-briefcase-alt-2',
        link: '/blog/list'
                
    },
    {
        id: 49,
        label: 'MENUITEMS.DELEGATESTATISTICS.TEXT',
        icon: 'bx bx-stats',
        link: '/blog/list'
                
    },
    {
        id: 50,
        label: 'MENUITEMS.COMPLAINTS.TEXT',
        icon:  'bx bx-error',
        link: '/blog/list'
                
    },
    // {
    //     id: 20,
    //     label: 'MENUITEMS.SALESANDREPORTS.TEXT',
    //     icon: 'bx-file',
    //     subItems: [
    //         {
    //             id: 21,
    //             label: 'MENUITEMS.SALESANDREPORTS.LIST.EARNINGREPORT',
    //             link: '/blog/list',
    //             parentId: 20
    //         },
    //         {
    //             id: 22,
    //             label: 'MENUITEMS.SALESANDREPORTS.LIST.INHOUSESALES',
    //             link: '/blog/grid',
    //             parentId: 20
    //         },
    //         {
    //             id: 23,
    //             label: 'MENUITEMS.SALESANDREPORTS.LIST.VENDORSALES',
    //             link: '/blog/detail',
    //             parentId: 20
    //         },
    //         {
    //             id: 24,
    //             label: 'MENUITEMS.SALESANDREPORTS.LIST.TRANSACTIONREPORT',
    //             link: '/blog/detail',
    //             parentId: 20
    //         },
    //     ]
    // },
];