insert into `employee` values
(1,'DefaultAdmin', 'Admin', true, 'admin', NOW(), NOW(),null,1)

insert into `pass` values
(1,'journee',0,'pour une journée en semaine',NOW(), NOW(),null),
(2,'week-end',0,'pour une journée en week-end',NOW(), NOW(),null),
(3,'annuel',0,'toutes l''année',NOW(),NOW(), null),
(4,'1dayMonth',0,'un jour par mois pendant 1 ans',NOW(),NOW(),null),

insert into `type` values
(1, 'admin', NOW() , NOW(), null),
(2, 'agent entretien', NOW() , NOW(), null),
(3, 'accueil', NOW(), NOW(), null),
(4, 'vendeur', NOW(), NOW(), null),
(5, 'soigneur', NOW(), NOW(), null);
