
import React from 'react';
import { Link } from 'react-router-dom';
import { FileEdit, UserPlus, PackagePlus, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const QuickActionCards = () => {
  const { t } = useLanguage();

  const actions = [
    {
      title: t.common.newOffer,
      description: t.home.createOfferDescription,
      icon: FileEdit,
      path: '/new-offer',
      color: 'bg-blue-100 text-blue-700',
      buttonText: t.common.create
    },
    {
      title: t.common.newClient,
      description: t.home.createClientDescription,
      icon: UserPlus,
      path: '/saved-clients?new=true',
      color: 'bg-green-100 text-green-700',
      buttonText: t.common.create
    },
    {
      title: t.common.newProduct,
      description: t.home.createProductDescription,
      icon: PackagePlus,
      path: '/saved-products?new=true',
      color: 'bg-purple-100 text-purple-700',
      buttonText: t.common.create
    },
    {
      title: t.common.templates,
      description: t.home.templatesDescription,
      icon: LayoutTemplate,
      path: '/templates',
      color: 'bg-amber-100 text-amber-700',
      buttonText: t.common.view
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
      {actions.map((action, index) => (
        <Card key={index} className="border rounded-lg shadow-sm flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-sm">{action.description}</CardDescription>
          </CardContent>
          <CardFooter className="pt-2">
            <Button asChild className="w-full">
              <Link to={action.path}>
                <span>{action.buttonText}</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionCards;
