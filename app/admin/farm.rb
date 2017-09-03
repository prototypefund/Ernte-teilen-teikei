ActiveAdmin.register Farm do
  form do |f|
    PlaceForm.form(f)
    inputs 'Additional Farm Info' do
      input :vegetable_products, as: :select, collection: Farm.vegetable_products.values
      input :animal_products, as: :select, collection: Farm.animal_products.values
      input :beverages, as: :select, collection: Farm.beverages.values
      input :additional_product_information
      input :acts_ecological
      input :economical_behavior
      input :founded_at_year
      input :founded_at_month
      input :accepts_new_members, as: :select, collection: %w(yes no waitlist)
      input :maximum_members
      input :participation
    end
    actions
  end

  index do
    column :id , sortable: :id do |farm|
      link_to farm.id, [:admin, farm]
    end
    column :name
    column :location
  end

  show do
    panel 'Name and Description' do
      table do
        tr do
          td 'Name'
          td farm.name
        end
        tr do
          td 'URL'
          td farm.url
        end
        tr do
          td 'Description'
          td farm.description
        end
      end
    end

    panel 'Location' do
      table do
        tr do
          td 'City'
          td farm.city
        end
        tr do
          td 'Address'
          td farm.address
        end
        tr do
          td 'Latitude / longitude'
          td [farm.latitude, farm.longitude].join(' / ')
        end
      end
    end

    panel 'Details' do
      table do
        tr do
          td 'Vegetable products'
          td farm.vegetable_products.join(', ')
        end
        tr do
          td 'Animal products'
          td farm.animal_products.join(', ')
        end
        tr do
          td 'Beverages'
          td farm.beverages.join(', ')
        end
        tr do
          td 'Additional product information'
          td farm.additional_product_information
        end
        tr do
          td 'Economical behavior'
          td farm.economical_behavior
        end
        tr do
          td 'Founded at'
          td [farm.founded_at_month, farm.founded_at_year].join('/')
        end
        tr do
          td 'Accepts new members'
          td farm.accepts_new_members
        end
        tr do
          td 'Maximum_members'
          td farm.maximum_members
        end
        tr do
          td 'Participation'
          td farm.participation
        end
      end
    end
  end
end
