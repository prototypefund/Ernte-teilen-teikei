ActiveAdmin.register Initiative do
  form do |f|
    PlaceForm.form(f)
    actions
  end

  index do
    column :id , sortable: :id do |initiative|
      link_to initiative.id, [:admin, initiative]
    end
    column :name
    column :location
  end

  show do
    panel 'Name and Description' do
      table do
        tr do
          td 'Name'
          td initiative.name
        end
        tr do
          td 'URL'
          td initiative.url
        end
        tr do
          td 'Description'
          td initiative.description
        end
      end
    end

    panel 'Location' do
      table do
        tr do
          td 'City'
          td initiative.city
        end
        tr do
          td 'Address'
          td initiative.address
        end
        tr do
          td 'Latitude / longitude'
          td [initiative.latitude, initiative.longitude].join(' / ')
        end
      end
    end
  end
end
