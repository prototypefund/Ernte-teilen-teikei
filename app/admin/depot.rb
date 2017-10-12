ActiveAdmin.register Depot do
  form do |f|
    PlaceForm.form(f)
    inputs 'Associated Farms' do
      input :places, as: :select, collection: Farm.all
    end
    inputs 'Additional Depot Info' do
      input :delivery_days, as: :string
    end
    actions
  end

  index do
    column :id , sortable: :id do |depot|
      link_to depot.id, [:admin, depot]
    end
    column :name
    column :location
  end

  show do
    panel 'Name and Description' do
      table do
        tr do
          td 'Name'
          td depot.name
        end
        tr do
          td 'URL'
          td depot.url
        end
        tr do
          td 'Description'
          td depot.description
        end
      end
    end

    panel 'Location' do
      table do
        tr do
          td 'City'
          td depot.city
        end
        tr do
          td 'Address'
          td depot.address
        end
        tr do
          td 'Latitude / longitude'
          td [depot.latitude, depot.longitude].join(' / ')
        end
      end
    end

    panel 'Details' do
      table do
        tr do
          td 'Associated farms'
          # TODO: Display associated farms
        end
        tr do
          td 'Delivery days'
          td depot.delivery_days
        end
      end
    end
  end
end
